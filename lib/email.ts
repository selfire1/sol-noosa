import { Resend } from 'resend'
import { ENV } from 'varlock/env'

type EnquiryNotification = {
  fullName: string
  phoneNumber: string
  email: string
  message: string
  receivedAt: Date
}

const formatReceived = (receivedAt: Date): string => {
  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Brisbane',
  }).format(receivedAt)
}

// Never throws — the enquiry row is the source of truth and a failed send
// must not surface as a failed submission (FR-16).
export const sendEnquiryNotification = async (enquiry: EnquiryNotification): Promise<void> => {
  try {
    const resend = new Resend(ENV.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: `Sol Noosa Website <${ENV.RESEND_FROM_EMAIL}>`,
      to: ENV.ENQUIRY_NOTIFICATION_EMAIL,
      replyTo: enquiry.email,
      subject: `New enquiry from ${enquiry.fullName}`,
      text: [
        `Name: ${enquiry.fullName}`,
        `Phone: ${enquiry.phoneNumber}`,
        `Email: ${enquiry.email}`,
        `Received: ${formatReceived(enquiry.receivedAt)}`,
        '',
        enquiry.message,
      ].join('\n'),
    })
    if (error) {
      console.error('Failed to send enquiry notification', error)
    }
  } catch (error) {
    console.error('Failed to send enquiry notification', error)
  }
}
