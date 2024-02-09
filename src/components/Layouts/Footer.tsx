import Link from 'next/link';

const Footer = () => {
  return (
    <Link href="https://akram.agency" className="mt-auto p-6 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
      © {new Date().getFullYear()}. Akram Design All rights reserved.
    </Link>
  );
};

export default Footer;
