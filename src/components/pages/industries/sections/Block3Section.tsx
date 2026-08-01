import Link from 'next/link';

export function Block3Section() {
  return (
    <>
      <section
        className={
          'py-stack-lg px-margin-desktop max-w-container-max mx-auto mb-stack-lg'
        }
      >
        <div
          className={
            'bg-white border border-outline-variant/30 rounded-2xl p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden'
          }
        >
          <div
            className={
              'absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent'
            }
          ></div>
          <h2
            className={'font-display-lg text-display-lg mb-stack-md max-w-3xl'}
          >
            {'Ready to engineer the future of your sector?'}
          </h2>
          <p
            className={
              'font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-2xl'
            }
          >
            {
              'Connect with our industry specialists to discuss your specific technical requirements and integration challenges.'
            }
          </p>
          <div className={'flex flex-wrap justify-center gap-stack-md'}>
            <Link
              href={'/industrial-automation'}
              className={
                'bg-primary text-on-primary font-label-sm text-label-sm px-10 py-4 rounded-DEFAULT hover:bg-primary-container hover:text-on-primary-container transition-all'
              }
            >
              {'Schedule a Briefing'}
            </Link>
            {/* <Link
              href={'/industrial-automation'}
              className={
                'border border-outline font-label-sm text-label-sm px-10 py-4 rounded-DEFAULT hover:bg-surface-container-low transition-all'
              }
            >
              {'Download Sector Report'}
            </Link> */}
          </div>
        </div>
      </section>
    </>
  );
}
