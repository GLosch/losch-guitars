import { notFound } from 'next/navigation';
import { getPageFromSlug } from '../../utils/content.js';
import Image from '../../components/Image.jsx';
import Heading from '../../components/Heading.jsx';

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug('/woods');

    if (!page) {
      return notFound();
    }

    const imageGroup = page.sections.find((section) => section.type === 'imageGroup');

    return (
      <div data-sb-object-id={page.id} className='container p-5 mx-auto'>
        <div className='mb-10 max-w-lg lg:mr-10 lg:mb-0'>
          <h1 className='pb-6 lg:pb-10'><Heading pageHeadingText='Some of my available top woods' /></h1>
        </div>
        <div className='container flex flex-col lg:flex-wrap lg:flex-row justify-between items-center'>
          {imageGroup.images.map((image) => (
            <div key={image.id} className='mr-5 mb-8'>
              <Image {...image} />
              <div className='text-lg text-center'>{image.alt}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error.message);
    return notFound();
  }
}
