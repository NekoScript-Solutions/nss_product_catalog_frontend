'use client';
import {
	createContext,
	useEffect,
	useState,
  useRef,
  ReactNode,
} from 'react';
import { ProductDescriptive } from "@/types/ProductDescriptive";
import { GetByIdResponse } from "@/types/GetByIdResponse";
import { getAllVariants, getPreferences } from "@/api/products";
import Loader from "@/components/Loader/Loader";
import { Product } from "@/types/Product";
import { ProductToAdd } from "@/types/ProductToAdd";

interface ProductContext {
  selectedImg: string | undefined;
  setSelectedImg: (url: string) => void;
  isLoading: Boolean;
  selectedProduct: ProductDescriptive | null;
	onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
  preferences: Product[] | null;
  productToAdd: ProductToAdd;
  category: string;
}

export const ProductContext = createContext<ProductContext>({
	selectedImg: '',
	setSelectedImg: () => {},
	isLoading: false,
	selectedProduct: null,
  onColorChange: () => {},
  onCapacityChange: () => {},
  preferences: null,
  category: '',
  productToAdd: { itemId: '', name: '', price: 0, image: '', category: ''},
});

interface Data extends GetByIdResponse {
  preferences?: Product[]
}

interface Props {
  children: ReactNode,
  params: {
    id: string
    category: string
  }
}

async function fetchData(id: string): Promise<Data> {
  const dataCurrent: Data = await getAllVariants(id);
  dataCurrent.preferences = await getPreferences(id);

  if (!dataCurrent) {
    throw new Error('No matching product');
  }

  return dataCurrent;
}

export function ProductPageContextProvider({ children, params }: Props) {
	const data = useRef<Data>();

  useEffect(() => {
    const fetchDataAndSetupContext = async () => {
      setIsLoading(true);
      try {
        data.current = await fetchData(params.id);
        const descriptiveProduct = data.current.variants.find(
          (variant) => data.current?.product.itemId === variant.id
        ) as ProductDescriptive;
        setSelectedProduct(descriptiveProduct);
        setSelectedImg(descriptiveProduct.images[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndSetupContext();
  }, [params.id]);

	const [
		selectedProduct,
		setSelectedProduct
	] = useState<ProductDescriptive | null>(null);
	const [
		selectedImg,
		setSelectedImg
	] = useState(selectedProduct?.images[0]);
	const [
		isLoading,
		setIsLoading,
	] = useState(true);

  const productToAdd = {
    category: data.current?.product.category,
    itemId: selectedProduct?.id,
    name: selectedProduct?.name,
    price: selectedProduct?.priceDiscount,
    image: selectedProduct?.images[0],
  } as ProductToAdd

	const onColorChange = (newColor: string) => {
		const product = data
			.current
			?.variants
			.find(({ color, capacity}) => color === newColor && capacity === selectedProduct?.capacity) || null;

		setSelectedProduct(product);
		setSelectedImg(product?.images[0])
	}

	const onCapacityChange = (newCapacity: string) => {
		const product = data
			.current
			?.variants
			.find(({ color, capacity}) => (color === selectedProduct?.color && capacity === newCapacity)) || null

		setSelectedProduct(product);
	}


  return (
    isLoading
      ? (
        <Loader/>
      ) : (
		    <ProductContext.Provider
			    value={{
				    selectedImg,
				    isLoading,
				    selectedProduct,
            onColorChange,
            onCapacityChange,
            setSelectedImg,
            productToAdd,
            category: params.category,
            preferences: data.current?.preferences as Product[],
			    }}
		    >
			    {children}
		    </ProductContext.Provider>
      )
  );
}
