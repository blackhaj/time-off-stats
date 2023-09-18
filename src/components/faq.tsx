import { Disclosure } from '@headlessui/react';
import { MinusIcon } from './icons/minus-icon';
import { PlusIcon } from './icons/plus-icon';
import Link from 'next/link';
import { InlineLink } from './InlineLink';
import { DownloadLink } from './download-link';

const Question = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-base font-semibold leading-7">{children}</span>;
};

const Answer = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-base leading-7 text-gray-600">{children}</p>;
};

const faqs = [
  {
    question: <Question>What do you do with my data?</Question>,
    answer: (
      <Answer>
        Nothing. The data stays in your browser, we don&apos;t send it anywhere.
        The code is open source, so you can{' '}
        <InlineLink href="https://github.com/blackhaj/time-off" external>
          check for yourself here
        </InlineLink>
        .
      </Answer>
    ),
  },
  {
    question: <Question>How do I find my data?</Question>,
    answer: (
      <Answer>
        Go to the{' '}
        <InlineLink
          href="https://mazein.slack.com/apps/AELEX1TU3-time-off-by-deel"
          external
        >
          Time Off by Deel
        </InlineLink>{' '}
        app page in Slack. Click the &quot;Home&quot; tab and select &quot;OOO
        History&quot; from the dropdown. Scroll to the bottom of the page and
        click the &quot;Export OOO to CSV button&quot;.
      </Answer>
    ),
  },
  {
    question: (
      <Question>
        I don&apos;t use Time Off by Deel, can I use other data?
      </Question>
    ),
    answer: (
      <div>
        <Answer>
          You can but it needs to match a certain format. The file needs to be a
          CSV file and have the following columns:
        </Answer>
        <ul className="list-disc list-inside my-2 ml-4">
          <li>&quot;Request Type&quot;</li>
          <li>&quot;Num Days&quot;</li>
          <li>&quot;Holidays Taken&quot;</li>
          <li>&quot;Start Date&quot;</li>
          <li>&quot;End Date&quot;</li>
          <li>&quot;Status&quot; - can be Approved or Rejected</li>
        </ul>
        <Answer>
          You can download{' '}
          <DownloadLink href="/time-off-example.csv">
            an example file here
          </DownloadLink>
          .
        </Answer>
      </div>
    ),
  },
  {
    question: <Question>Who made this?</Question>,
    answer: (
      <Answer>
        Henry Black 👋. You can find out more on{' '}
        <InlineLink href="https://henryblack.co/" external>
          my website
        </InlineLink>
        ,{' '}
        <InlineLink href="https://twitter.com/hajblack" external>
          follow me on Twitter
        </InlineLink>{' '}
        or{' '}
        <InlineLink href="https://github.com/blackhaj" external>
          check out my Github
        </InlineLink>
      </Answer>
    ),
  },
];

export const FAQ = () => {
  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <Disclosure
                as="div"
                key={index}
                className="pt-6"
                defaultOpen={index === 0}
              >
                {({ open }) => {
                  return (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          {faq.question}
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        {faq.answer}
                      </Disclosure.Panel>
                    </>
                  );
                }}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
