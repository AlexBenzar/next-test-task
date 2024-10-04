'use client';
import '@/styles/page.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [site, setSite] = useState({});
  const [menuItem, setMenuItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:1337/api/site?populate[0]=info.img')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSite(data.data);
      })
      .finally(() => setIsLoading(true));
  }, []);

  console.log(site);

  return isLoading ? (
    <div className="diff">
      <div className="diff__container">
        <div className="diff__sub-title">{site.subtitle}</div>
        <div className="diff__title">{site.title}</div>
        <div className="diff__text">{site.text}</div>
        <div className="diff__menu menu">
          <div className="menu__page">
            <div className="menu__info">
              <div className="menu__title">{site.info[menuItem].title}</div>
              <div className="menu__text">{site.info[menuItem].text}</div>
            </div>
            <div className="menu__image">
              <Image
                src={`/images/${site.info[menuItem].img.name}`}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          </div>
          <div className="menu__nav">
            <ul>
              {site.info.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setMenuItem(index)}
                  className={index === menuItem ? '_active' : ''}>
                  <div>&lt;</div>
                  <div>{item.title}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
