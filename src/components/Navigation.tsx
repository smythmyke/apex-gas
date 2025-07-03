import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="https://apeximagegas.net" className="flex items-center space-x-4">
            <Image 
              src="/apex_logo.png" 
              alt="Apex Image Gas Logo" 
              width={40} 
              height={40}
              className="logo-shine"
            />
            <h1 className="text-2xl font-bold">
              <span style={{ fontFamily: 'Orbitron, sans-serif' }}>APEX</span> Image Gas
            </h1>
          </a>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="https://apeximagegas.net/#about" className="hover:text-blue-200">
                About
              </a>
            </li>
            <li>
              <a href="https://apeximagegas.net/#product" className="hover:text-blue-200">
                Product
              </a>
            </li>
            <li>
              <a href="https://apeximagegas.net/#pricing" className="hover:text-blue-200">
                Pricing
              </a>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-200">
                Blog
              </Link>
            </li>
            <li>
              <a href="https://apeximagegas.net/#contact" className="hover:text-blue-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}