export const PRODUCT_QUERY =`
query
{
  products
  {
    data
    {
      attributes
      {
        Title
        Description
        price
        slug
        image
        {
          data
          {
            attributes
            {
              formats
            }
          }
        }
      }
    }
  }
}
`;
// Way of fetching data from Strapi
//passes variable slug whose value is a string and '!' means required 
// the products are filtered where slug equals to $slug
export const GET_PRODUCT_QUERY =`
  query getProduct($slug: String!){
    products(filters: {slug: {eq: $slug}}){
      data{
        attributes{
          Title,
          Description,
          price,
          slug,
          image{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`;