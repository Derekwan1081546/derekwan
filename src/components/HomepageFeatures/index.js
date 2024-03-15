import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
const FeatureList = [
  {
    title: '關於我',
    imageSrc: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        我叫萬彥君，在就讀大學的期間開始學習寫程式，喜歡利用程式解決問題，在這幾年當中，學到了許多程式語言，例如:C++、C、C#、Python、Java 等程式語言，也同時培養了程式設計的基礎能力以及邏輯訓練的能力。
      </>
    ),
  },
  {
    title: '求學經歷',
    imageSrc: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        碩士就讀於：國立台北科技大學－電機工程研究所🎓︎
        <br></br>
        <br></br>
        大學畢業於：元智大學－資訊工程學系🎓︎
      </>
    ),
  },
  {
    title: '學過的相關技能',
    imageSrc: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        C++、C、C#、Python、Java、javaScript和MySQL等程式語言📓
      </>
    ),
  },
];

function Feature({imageSrc, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={imageSrc} alt={title} className={styles.featureImage} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

// const FeatureList = [
//   {
//     title: '關於我',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         我叫萬彥君，在就讀大學的期間開始學習寫程式，喜歡利用程式解決問題，在這幾年當中，學到了許多程式語言，例如:C++、C、C#、Python、Java 等程式語言，也同時培養了程式設計的基礎能力以及邏輯訓練的能力。
//       </>
//     ),
//   },
//   {
//     title: '求學經歷',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         碩士就讀於：國立台北科技大學－電機工程研究所🎓︎
//         <br></br>
//         <br></br>
//         大學畢業於：元智大學－資訊工程學系🎓︎
//       </>
//       // <>
//       //   Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
//       //   ahead and move your docs into the <code>docs</code> directory.
//       // </>
//     ),
//   },
//   {
//     title: '學過的相關技能',
//     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         C++、C、C#、Python、Java等程式語言
//       </>
//     ),
//   },
// ];

// function Feature({Svg, title, description}) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <Heading as="h3">{title}</Heading>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// export default function HomepageFeatures() {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//           {FeatureList.map((props, idx) => (
//             <Feature key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
