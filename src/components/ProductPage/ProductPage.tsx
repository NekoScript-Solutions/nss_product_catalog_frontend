import { useContext } from "react";
import { ProductContext } from "@/contexts/ProductPageContextProvider";
import style from './page.module.scss'
import grid from '@/styles/modules/grid.module.scss'
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import Image from "next/image";
import { URL_BASE } from "@/utils/constants";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import ColorButton from "@/components/ColorButton/ColorButton";
import AddToButtons from "@/components/AddToButtons/AddToButtons";
import { Product } from "@/types/Product";
import ProductsCarousel from "@/components/ProdactsCarouselHome/ProdactCarouselHome";
import 'animate.css';

export default function ProductPage() {
	const {
		selectedProduct,
    category,
		selectedImg,
		onColorChange,
		onCapacityChange,
		setSelectedImg,
    productToAdd,
    preferences,
	} = useContext(ProductContext);

	return (
		!selectedProduct
			? (
				<h1 style={{ textAlign: 'center'}}>Unable to load the product, try again later</h1>
			) : (
				<div className={`${style.page} ${grid.template} animate__animated animate__fadeInDownBig`}>
					<BreadCrumbs category={category} productName={selectedProduct.name} />

					<h1 className={`${style.page__title} ${style.title}`}>{selectedProduct.name}</h1>

					<div className={classNames(style.page__image_selected, 'animate__animated', 'animate__fadeIn')}>
						<Image
							src={`${URL_BASE}/${selectedImg}`}
							alt={'product image'}
							fill={true}
							style={{ objectPosition: 'center top',objectFit: 'contain'}}
              className={classNames('animate__animated', 'animate__fadeIn')}
						/>
					</div>

					<div className={classNames(style.page__images, style.images)}>
						{selectedProduct.images.map(image => (
							<button
								className={classNames({
									[style.images__button]: true,
									[style.images__button_selected]: selectedImg === image,
								})}
								onClick={() => setSelectedImg(image)}
								key={uuidv4()}
							>
								<Image
									src={`${URL_BASE}/${image}`}
									alt={'phone image'}
									fill={true}
									className={style.images__button__image}
								/>
							</button>
						))}
					</div>

					<section className={`${style.page__options} ${style.options}`}>
						<div className={`${style.options__colors} ${style.colors}`}>
							<p className={style.colors__text}>
								Available colors
							</p>

							<div className={`${style.colors__buttons} ${style.buttons}`}>
								{selectedProduct.colorsAvailable.map(color => {
									const selected = selectedProduct.color === color;

									return (
										<
											ColorButton
											color={color}
											selected={selected}
											key={color}
											onClick={onColorChange}
										/>
									)
								})}
							</div>
						</div>

						<div className={`${style.options__divider_color} ${style.divider}`}/>

						<div className={`${style.options__capacity} ${style.capacity}`}>
							<p className={style.capacity__text}>
								Select capacity
							</p>

							<div className={`${style.capacity__buttons}`}>
								{selectedProduct.capacityAvailable.map(capacity => (
									<button
										key={capacity}
										className={classNames(
											{
												[style.capacity__buttons__button]: true,
												[style.capacity__buttons__button__selected]: selectedProduct.capacity === capacity,
											})}
										onClick={() => onCapacityChange(capacity)}
									>
										{capacity}
									</button>
								))}
							</div>
						</div>

						<div className={`${style.options__divider_capacity} ${style.divider}`}/>

						<p className={`${style.options__price} ${style.price}`}>
              <span className={style.price__new}>
                ${selectedProduct.priceDiscount}
              </span>

							<span className={style.price__old}>
                ${selectedProduct.priceRegular}
              </span>
						</p>

						<div className={style.options__buttons_buy}>
							<AddToButtons product={productToAdd}/>
						</div>

						<div className={style.pairs}>
							<p className={style.pair}>
                <span className={style.pair__label_small}>
                  Screen:
                </span>

								<span className={style.pair__value_small}>
                  {selectedProduct.screen}
                </span>
							</p>

							<p className={style.pair}>
                <span className={style.pair__label_small}>
                  Resolution:
                </span>

								<span className={style.pair__value_small}>
                  {selectedProduct.resolution}
                </span>
							</p>

							<p className={style.pair}>
                <span className={style.pair__label_small}>
                  Processor:
                </span>

								<span className={style.pair__value_small}>
                  {selectedProduct.processor}
                </span>
							</p>

							<p className={style.pair}>
                <span className={style.pair__label_small}>
                  RAM:
                </span>

								<span className={style.pair__value_small}>
                  {selectedProduct.ram}
                </span>
							</p>
						</div>
					</section>

					<section className={`${style.page__description} ${style.section}`}>
            <h2 className={style.section__title}>About</h2>

            <div className={`${style.section__divider} ${style.divider}`} />

            {selectedProduct.description.map(({ title, text}) => (
              <article key={title} className={style.article}>
                <h3 className={style.article__title}>{title}</h3>

                <p className={style.article__text}>
                  {text.map(paragraph => (
                    <span className={style.article__text__paragraph} key={uuidv4()}>
                      {paragraph}
                    </span>
                  ))}
                </p>
              </article>
            ))}
					</section>

					<section className={`${style.page__specs} ${style.section}`}>
						<h2 className={style.section__title}>Tech specs</h2>

            <div className={style.divider} />

						<div className={style.pairs}>
							<p className={style.pair}>
                <span className={style.pair__label}>
                  Screen
                </span>

								<span className={style.lable__value}>
                  {selectedProduct.screen}
                </span>
							</p>

							<p className={style.pair}>
                <span className={style.pair__label}>
                  Resolution
                </span>

								<span className={style.lable__value}>
                  {selectedProduct.resolution}
                </span>
							</p>

							<p className={style.pair}>
                <span className={style.pair__label}>
                  Processor
                </span>

								<span className={style.lable__value}>
                  {selectedProduct.processor}
                </span>
							</p>

							<p className={style.pair}>
                <span className={style.pair__label}>
                  RAM
                </span>

								<span className={style.lable__value}>
                  {selectedProduct.ram}
                </span>
							</p>

							<p className={style.pair}>
                <span className={style.pair__label}>
                  Built in memory
                </span>

								<span className={style.lable__value}>
                  {selectedProduct.capacity}
                </span>
							</p>

              {selectedProduct.camera && (
                <p className={style.pair}>
                <span className={style.pair__label}>
                  Camera
                </span>

                  <span className={style.lable__value}>
                  {selectedProduct.camera}
                </span>
                </p>
              )}

              {selectedProduct.zoom && (
                <p className={style.pair}>
                <span className={style.pair__label}>
                  Zoom
                </span>

                  <span className={style.lable__value}>
                  {selectedProduct.zoom}
                </span>
                </p>
              )}

							<p className={style.pair}>
                <span className={style.pair__label}>
                  Cell
                </span>

								<span className={style.pair__value}>
                  {selectedProduct.cell.join(', ')}
                </span>
							</p>
						</div>
					</section>

          <section className={`${style.page__preferences} ${style.section}`}>
            <h2 className={style.section__title}>
              You may also like
            </h2>

            <ProductsCarousel products={preferences as Product[]} />
          </section>
				</div>
			)
	)
}
