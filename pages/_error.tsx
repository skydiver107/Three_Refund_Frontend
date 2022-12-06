import Typography from '@mui/material/Typography';

const Error = ({ statusCode }) => {
 return (
  <Typography variant={`h6`}>
   {statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}
  </Typography>
 );
}

Error.getInitialProps = ({ res, err }) => {
 const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
 return { statusCode };
};

export default Error;
