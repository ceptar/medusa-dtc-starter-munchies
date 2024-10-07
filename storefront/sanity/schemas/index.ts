import category from "./documents/category";
import collection from "./documents/collection";
import modularPage from "./documents/modular-page";
import product from "./documents/product";
import {cta} from "./objects/cta";
import {link} from "./objects/link";
import {ogImage} from "./objects/og-image";
import {lightPtBody, ptBody} from "./objects/pt-body";
import {sectionsBody} from "./objects/sections-body";
import {seo} from "./objects/seo";
import sections from "./sections";
import footer from "./singletons/footer";
import header from "./singletons/header";
import home from "./singletons/home";
import {settings} from "./singletons/settings";

const schemas = [
  modularPage,
  seo,
  ogImage,
  cta,
  link,
  settings,
  home,
  ptBody,
  lightPtBody,
  footer,
  header,
  ...sections,
  sectionsBody,
  product,
  collection,
  category,
];

export default schemas;
