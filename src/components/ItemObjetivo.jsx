import { ListItem, ListItemText } from "@mui/material";
import styled from "@emotion/styled";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&::before": {
    content: "'\\2022'",
    paddingRight: '8px',
    mt: '-45px'
  },
}));

const ItemObjetivo = ({ text }) => (
  <StyledListItem>
    <ListItemText primary={text} />
  </StyledListItem>
);

export default ItemObjetivo;