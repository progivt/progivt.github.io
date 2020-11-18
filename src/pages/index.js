import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import moment from 'moment-timezone';

moment.locale('ru');
moment().format('lll');

import {activeLabs} from '../lab.js'; // не придумал ничего лучше, потом допилю - ThePetrovich
let activeLab = null;

const features = [
  {
    title: 'Табличка',
    link: 'https://tiny.cc/progivt20',
    imageUrl: 'img/table.png',
    description: (
      <>
        Все заслуги здесь. Необходимо войти в&nbsp;аккаунт Google.
      </>
    ),
  },
  {
    title: 'Видеозаписи',
    link: 'https://drive.google.com/drive/folders/1pis2VYVbRBTIke3vCnz0bMQITlNuFgsh',
    imageUrl: 'img/videos.png',
    description: (
      <>
        Записи лекций и практики в период дистанционного обучениия
      </>
    ),
  },
  {
    title: 'GitHub',
    link: 'https://github.com/progivt/',
    imageUrl: 'img/adventure-cat.png',
    description: (
      <>
        Организация <b>progivt</b> на Гитхабе, все репозитории здесь.
      </>
    ),
  },
];

function Feature({imageUrl, title, description, link}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3><a href={link}>{title}</a></h3>
      <p>{description}</p>
    </div>
  );
}

function getClosestDeadline() {
  if (activeLabs) {
    if (activeLabs.length) {
      for (let i = 0; i < activeLabs.length; i++) {
        if (moment(activeLabs[i].deadline).diff(moment()) > 0) {
          activeLab = activeLabs[i];
          break;
        }
      }
    }
  }
}

var displayDeadlineInterval = false;

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  getClosestDeadline();

  setInterval(function()
  {
    if (displayDeadlineInterval) return false;
  
    displayDeadlineInterval = true;
  
    if (typeof(document) != 'undefined') {
      let docTitle = document.getElementById("heroTitle");
      let docSubtitle = document.getElementById("heroSubtitle");
    
      if (docTitle && activeLab) {
        let data = activeLab;
        
        if (data.deadline) {
          if (moment(data.deadline).diff(moment()) > 0) {
            let deadlineM = moment.tz(data.deadline, "Asia/Yakutsk");
            let timeNow = moment().tz("Asia/Yakutsk");

            let url = `<a style="color:#FFFFFF" href="${data.url}">${data.name}</a>`;

            docTitle.innerHTML = url;
            docSubtitle.textContent = "До конца лабы: " + deadlineM.diff(timeNow, 'days') + ' дн. ' + moment.utc(deadlineM.diff(timeNow)).format('HH:mm:ss');
          }
          else {
            docTitle.innerHTML = '';
            docTitle.textContent = siteConfig.title;
            docSubtitle.textContent = siteConfig.tagline;
          }
        }
      } 
    }
    displayDeadlineInterval = false;
  }, 1000);

  return (
    <Layout
      title={`${siteConfig.title}: Добро пожаловать `}
      description="Курс «Основы программирования» для студентов ИВТ ИМИ СВФУ">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title" id="heroTitle">{siteConfig.title}</h1>
          <p className="hero__subtitle" id="heroSubtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/js04loop')}>
              Начать
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
