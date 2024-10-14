import { Suspense } from "react";
import {
  Container,
  Filters,
  ProductsGroupList,
  Stories,
  TopBar
} from "@/components/shared";
import { findPizzas, GetSearchParams } from "@/shared/lib";
import s from './clientPage.module.scss'

export default async function ClientPage({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Stories />
      <Container className={s.client__content}>
        <div className={s.client__content__wrapper}>

          <div className={s.client__content__filters}>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className={s.client__content__products}>
            <div className={s.client__content__products__list}>
              <Suspense>
                {categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
