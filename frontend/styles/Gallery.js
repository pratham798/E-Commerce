import styled from "styled-components";
export const Gallery=styled.div`
display: grid;
/* grid used  */
/* auto fit resizes according to space and min max specifies min width */
grid-template-columns: repeat(auto-fit, minmax(15rem,1fr));
/* grid-template-rows: repeat(auto, 15rem); */

grid-gap: 2rem;
`;