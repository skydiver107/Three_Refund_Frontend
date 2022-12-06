import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Custom404() {
  return (
    <Stack
      direction={`row`}
      alignItems={`center`}
      justifyContent={`center`}
    >
      <Typography
        variant={`h6`}
      >
        Ooops! Page Not Found
      </Typography>
    </Stack>
  )
}