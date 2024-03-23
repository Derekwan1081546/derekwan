import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import BrowserOnly from "@docusaurus/BrowserOnly";
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Experience from "../components/experience/experience";
import Experiences from "../helper/experience.json";
import Projects from "../components/Projects/Projects";
import Project from "../helper/Projects.json";
import SideProject from "../helper/SideProjects.json";
import { color } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
         Welcome to Derekwan's blog!
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            我的程式筆記
          </Link>
        </div>
        <br></br>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            我的部落格
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      // title={`welcome${siteConfig.title}`}
      // title={'welcome'}
      description="Derekwan的部落格">
      <HomepageHeader />
      <main>
      <div style={{ position: "relative", zIndex: 0 }}>
      <h1
            style={{
              fontSize: "clamp(2rem, 3vw + 1rem, 3rem)",
              textAlign: "center",
              marginBottom: "4rem",
              marginTop: "4rem",
            }}
          >
            關於我
          </h1>
        <HomepageFeatures />
        
        <h1
            style={{
              fontSize: "clamp(2rem, 3vw + 1rem, 3rem)",
              textAlign: "center",
              marginBottom: "4rem",
              marginTop: "4rem",
            }}
          >
            求學經歷
          </h1>
          <BrowserOnly fallback={<Loading />}>
            {() => {
              return (
                <>
                  <Experience Experiences={Experiences} />
                </>
              );
            }}
          </BrowserOnly>

          <Projects
            ProjectsData={Project}
            title="曾經做過的專案"
          />
          <Projects
            ProjectsData={SideProject}
            title="個人作品 (Side Projects)"
          />
        </div>
      </main>
      <Analytics></Analytics>
    </Layout>
    
  );
}

const Loading = () => (
  <div className="loading">
    <div className="loadingio-spinner-rolling-f1v13ukb9js">
      <div className="ldio-nawj84fd2cd">
        <div></div>
      </div>
    </div>
  </div>
);
