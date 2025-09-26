import { createFileRoute } from '@tanstack/react-router';
import { Test } from '~/start';
import { ResponsiveYouTubeVideo } from '~/components/YouTubeVideo';
import { ContactCard, QuickContactCard } from '~/components/ContactCard';

export const Route = createFileRoute('/')({
  // server: {
  //   handlers: {
  //     GET: ({ context, next }) => {
  //       context.fromFetch
  //       //      ^?
  //       context.fromServerMw
  //       //      ^?
  //       context.fromIndexServerMw
  //       //      ^?
  //       return next({
  //         context: {
  //           fromGet: true,
  //         },
  //       })
  //     },
  //     POST: ({ context, next }) => {
  //       context.fromFetch
  //       context.fromServerMw
  //       context.fromIndexServerMw
  //       return next({
  //         context: {
  //           fromPost: true,
  //         },
  //       })
  //     },
  //   },
  //   // handlers: ({ createHandlers }) =>
  //   //   createHandlers({
  //   //     GET: {
  //   //       middleware: [testGetMiddleware],
  //   //       handler: ({ context, next }) => {
  //   //         context.fromFetch
  //   //         //      ^?
  //   //         context.fromServerMw
  //   //         //      ^?
  //   //         context.fromIndexServerMw
  //   //         //      ^?
  //   //         context.fromGetMiddleware
  //   //         //      ^?
  //   //         return next({
  //   //           context: {
  //   //             fromGet: true,
  //   //             fromPost: false,
  //   //           },
  //   //         })
  //   //       },
  //   //     },
  //   //     POST: {
  //   //       handler: ({ next }) => {
  //   //         return next({
  //   //           context: {
  //   //             fromGet: false,
  //   //             fromPost: true,
  //   //           },
  //   //         })
  //   //       },
  //   //     },
  //   //   }),
  //   test: (test) => {},
  // },
  loader: () => {
    return new Test('test');
  },
  component: Home,
});

function Home() {
  return (
    <div className='p-2 pt-28 max-w-4xl mx-auto'>
      <h3 className='text-4xl  font-bold mb-6'>Pourquoi une IA agentique? </h3>

      <div className='space-y-8'>
        {/* Responsive YouTube Video */}
        <div>
          <h4 className='text-lg font-semibold mb-4'>
            Du Chaos Au Calme : L'IAgentique
          </h4>
          <ResponsiveYouTubeVideo
            videoId='k49HF6GzNSw'
            title="Du Chaos Au Calme : L'IAgentique"
            // className='max-w-2xl'
          />
        </div>

        {/* Contact Cards Section */}
        <div>
          <div className='pt-12 max-w-sm mx-auto'>
            {/* Detailed Contact Card */}
            <ContactCard
              contact={{
                name: 'EcomZen',
                title: 'Structure et technologie pour vos rêves',

                email: 'admin@ecomzen.ca',
                phone: '514-805-6266',
                website: 'https://ecomzen.ca',
                address: 'Montréal',
              }}
              variant='detailed'
              className='hover:shadow-lg transition-shadow'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
