import PropTypes from "prop-types";
import 'antd/dist/antd.css'
import Head from "next/head";
import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  )
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird)