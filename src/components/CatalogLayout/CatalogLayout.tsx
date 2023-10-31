import grid from 'src/styles/modules/grid.module.scss'
import titles from 'src/styles/modules/titles.module.scss';

import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import phones from './CatalogLayout.module.scss'
import { ProductCard } from "@/components/ProductCard";
import Dropdown from "@/components/Dropdown/Dropdown";

interface Props {
  category: string;
}

export default function CatalogLayout({ category }: Props) {
  const formattedHeader = category.slice(1).padStart(category.length, category.slice(0,1).toUpperCase());

  return (
    <div className={grid.template}>
      <BreadCrumbs category={formattedHeader}/>
      <h1 className={titles.main}>{formattedHeader}</h1>
      <p className={phones.title_sub}>95 Models</p>

      <div className={phones.sort}>
        <p className={phones.sort__parameter}>Sort by</p>

        <Dropdown options={[{value: 'newest', text: 'Newest'}]} />
      </div>

      <div className={phones.pagination}>
        <p className={phones.pagination__parameter}>Items on page</p>

        <Dropdown options={[{value: 16, text: '16'}]} />
      </div>

      <div className={phones.products}>

      </div>
    </div>
  )
}
