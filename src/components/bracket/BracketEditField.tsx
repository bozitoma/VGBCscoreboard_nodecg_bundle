import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { BracketRoundFieldUnit } from "./BracketRoundFieldUnit";
import { BracketField } from "./BracketField";

export function BracketEditField() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {/* Winners Round Text */}
        <BracketRoundFieldUnit
          text="Winners Side"
          Round1="WQF"
          Round2="WSF"
          Round3="WF"
          Round4="GF"
          Round5="GF2"
        />

        {/* Winners Side */}
        <Stack spacing={2} direction="row">
          {/* WQF */}

          <Stack spacing={2}>
            <BracketField roundName="WQFa" />
            <BracketField roundName="WQFb" />
            <BracketField roundName="WQFc" />
            <BracketField roundName="WQFd" />
          </Stack>

          {/* WSF */}
          <Stack spacing={14.5} sx={{ pt: 6 }}>
            <BracketField roundName="WSFa" />
            <BracketField roundName="WSFb" />
          </Stack>

          {/* WF */}
          <Stack sx={{ pt: 19 }}>
            <BracketField roundName="WF" />
          </Stack>

          {/* GF */}
          <Stack sx={{ pt: 19 }}>
            <BracketField roundName="GF" />
          </Stack>

          {/* GF2 */}
          <Stack sx={{ pt: 19 }}>
            <BracketField roundName="GF2" />
          </Stack>
        </Stack>

        {/* Losers Round Text */}
        <BracketRoundFieldUnit
          text="Losers Side"
          Round1="LTOP16"
          Round2="LTOP8"
          Round3="LQF"
          Round4="LSF"
          Round5="LF"
        />

        {/* Losers Side */}
        <Stack spacing={2} direction="row">
          {/* LTOP16 */}
          <Stack spacing={2}>
            <BracketField roundName="LTOP16a" />
            <BracketField roundName="LTOP16b" />
            <BracketField roundName="LTOP16c" />
            <BracketField roundName="LTOP16d" />
          </Stack>

          {/* LTOP12 */}
          <Stack spacing={14.5} sx={{ pt: 6 }}>
            <BracketField roundName="LTOP8a" />
            <BracketField roundName="LTOP8b" />
          </Stack>

          {/* LQF */}
          <Stack spacing={14.5} sx={{ pt: 6 }}>
            <BracketField roundName="LQFa" />
            <BracketField roundName="LQFb" />
          </Stack>

          {/* LSF */}
          <Stack sx={{ pt: 19 }}>
            <BracketField roundName="LSF" />
          </Stack>

          {/* LF */}
          <Stack sx={{ pt: 19 }}>
            <BracketField roundName="LF" />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
