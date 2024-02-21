// 参考 https://codesandbox.io/s/material-ui-counter-yo5tx?file=/src/App.js:0-1618
import { Divider, Box } from "@mui/material";

type Props = {
  text: string;
};

export function TitleDivider({ text }: Props) {
  return (
    <>
      <Divider>
        <Box
          sx={{
            color: "text.secondary",
            textAlign: "center",
            fontWeight: "medium",
            fontFamily: "Noto Sans JP",
          }}
        >
          {text}
        </Box>
      </Divider>
    </>
  );
}
