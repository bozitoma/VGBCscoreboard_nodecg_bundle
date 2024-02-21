import { Paper, styled } from "@mui/material";

export const useStyled = () => {
  const Heading = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#525F78",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#F5F5F5",
    fontSize: 18,
    fontWeight: "bold",
    width: 660,
  }));

  return {
    Heading,
  };
};
