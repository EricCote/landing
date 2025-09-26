import React from 'react';

interface ContactInfo {
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  avatar?: string;
}

interface ContactCardProps {
  contact: ContactInfo;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  showAvatar?: boolean;
  clickableLinks?: boolean;
}

export function ContactCard({
  contact,
  variant = 'default',
  className = '',
  showAvatar = true,
  clickableLinks = true,
}: ContactCardProps) {
  const { name, title, company, email, phone, website, address, avatar } =
    contact;

  // Base card classes
  const cardClasses = `bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`;

  // Variant-specific classes
  const variantClasses = {
    default: 'p-6',
    compact: 'p-4',
    detailed: 'p-8',
  };

  // Helper function to format phone number for tel: link
  const formatPhoneLink = (phone: string) => {
    return `tel:${phone.replace(/\s+/g, '')}`;
  };

  // Helper function to format website URL
  const formatWebsiteUrl = (website: string) => {
    if (!website.startsWith('http://') && !website.startsWith('https://')) {
      return `https://${website}`;
    }
    return website;
  };

  return (
    <div className={`${cardClasses} ${variantClasses[variant]}`}>
      <div className='flex items-start space-x-4'>
        {/* Contact Info */}
        <div className='flex-1 min-w-0'>
          {/* Name and Title */}
          <div className='mb-3'>
            {name && (
              <h3 className='text-lg font-semibold text-gray-900 truncate'>
                {name}
              </h3>
            )}
            {title && (
              <p className='text-sm text-gray-600 mt-1'>
                {title}
                {company && (
                  <span className='text-gray-500'> at {company}</span>
                )}
              </p>
            )}
            {!title && company && (
              <p className='text-sm text-gray-600 mt-1'>{company}</p>
            )}
          </div>

          {/* Contact Details */}
          <div className='space-y-2'>
            {email && (
              <div className='flex items-center space-x-2'>
                <EmailIcon className='w-4 h-4 text-gray-400 flex-shrink-0' />

                <a
                  href={`mailto:${email}`}
                  className='text-sm text-blue-600 hover:text-blue-800 hover:underline truncate'
                >
                  {email}
                </a>
              </div>
            )}

            {phone && (
              <div className='flex items-center space-x-2'>
                <PhoneIcon className='w-4 h-4 text-gray-400 flex-shrink-0' />

                <a
                  href={formatPhoneLink(phone)}
                  className='text-sm text-blue-600 hover:text-blue-800 hover:underline'
                >
                  {phone}
                </a>
              </div>
            )}

            {website && (
              <div className='flex items-center space-x-2'>
                <WebIcon className='w-4 h-4 text-gray-400 flex-shrink-0' />

                <a
                  href={formatWebsiteUrl(website)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-blue-600 hover:text-blue-800 hover:underline truncate'
                >
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}

            {address && variant === 'detailed' && (
              <div className='flex items-start space-x-2'>
                <LocationIcon className='w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5' />
                <span className='text-sm text-gray-700'>{address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple SVG Icons (you can replace these with your preferred icon library)
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
      />
    </svg>
  );
}

function WebIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
      />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  );
}

// Preset contact card for quick usage
export function QuickContactCard({
  name,
  email,
  phone,
  className,
}: {
  name: string;
  email?: string;
  phone?: string;
  className?: string;
}) {
  return (
    <ContactCard
      contact={{ name, email, phone }}
      variant='compact'
      className={className}
    />
  );
}
