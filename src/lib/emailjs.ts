import emailjs from '@emailjs/browser';

export interface RsvpNotificationData {
  guest_name: string;
  guest_email: string;
  attendance: string;
  guest_count: number;
  message: string;
  wedding_date?: string;
  wedding_time?: string;
  venue_name?: string;
  venue_location?: string;
  invitation_url: string;
  submitted_at: string;
}

export const sendRsvpNotification = async (data: RsvpNotificationData): Promise<boolean> => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS environment variables are not properly configured.');
    return false;
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        ...data,
      },
      {
        publicKey: publicKey,
      }
    );

    if (response.status === 200) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to send RSVP notification email via EmailJS:', error);
    return false;
  }
};
