import React, { useState, useEffect } from "react";
// Css file
import "./Home.scss";

// Images
import imageLarge from "./images/bernardo-lorena-ponte.jpg";
import imageSmall from "./images/bernardo-lorena-ponte-small.jpg";

// Axios
import axios from "axios";

// HELMET (SEO)
import { Helmet } from "react-helmet";

export default function Home() {
  const [images, setImages] = useState([]);

  // Unsplash API call
  useEffect(() => {
    const apiRoot = `${process.env.REACT_APP_UNSPLASH_URI}?page=1&query=Historical-places`;
    const getImages = async () => {
      try {
        const { data } = await axios.get(
          `${apiRoot}?&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
        );
        let finalData = [];
        data.results.forEach((place, i) => {
          if (i <= 5) {
            finalData.push({
              title: `Country${i + 1}`,
              subtitle: `place${i + 1}`,
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
              image_url: place.urls,
            });
          }
        });
        setImages(finalData);
      } catch (err) {}
    };
    getImages();
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Valtech Challenge</title>
        <meta
          name="description"
          content="A grid layout challenge using react"
        />
        <meta name="keywords" content="Valtech, Grid layout, React" />
      </Helmet>
      <section className="gallery">
        {/* Static landscape image  */}
        <article className={`static-card`} tabIndex="0">
          <picture className={`image-static`}>
            <source srcSet={imageLarge} media="(min-width: 768px)" />
            <img src={imageSmall} alt="valtech" />
          </picture>
          <div className="card-content-wrapper">
            <div className="card-content">
              <header>
                <p>front-end</p>
                <h2>Valtech_</h2>
              </header>
              <div className="card-body">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  eaque asperiores laborum eius enim corrupti possimus.
                </p>
                <button>Explore More</button>
              </div>
            </div>
          </div>
        </article>

        {/* Images from unsplash API  */}
        {images.map((image, i) => (
          <article
            className={`card-${i + 1}`}
            tabIndex="0"
            key={i}
            data-testid="images"
          >
            <picture className={`image-${i + 1}`}>
              <source
                srcSet={image.image_url.regular}
                media="(min-width: 768px)"
              />
              <img
                src={image.image_url.small}
                alt={`historical building${i + 1}`}
              />
            </picture>
            <div className="card-content-wrapper">
              <div className="card-content">
                <header>
                  <p>{image.title}</p>
                  <h2>{image.subtitle}</h2>
                </header>
                <div className="card-body">
                  <p>{image.description}</p>
                  <button>
                    <span className="btn__content" tabIndex="-1">
                      Explore More
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
