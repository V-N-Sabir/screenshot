"use client";

import styles from "./page.module.css";
import Image from "next/image";
import img from "../component/image/error404.png";
import {getIpInfo} from "../component/utils/index";
import { useEffect } from "react";


export default function Home() {

 useEffect(() => {
    async function loadIpInfo() {
      try {
     await  getIpInfo(true)
      } catch (err) {

      }
    }

    loadIpInfo();
  }, []);


  return (
     <div className={styles.page}>
      <main className={styles.main}>

        <Image
          src={img} // картинка в папке public
          alt="Страница не найдена"
          width={740}
          height={493}
          className={styles.image}
           priority
        />
      </main>
    </div>
  );
}
