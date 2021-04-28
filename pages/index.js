import Head from "next/head";
import { useEffect } from "react";
import { FETCH_HEROS, SELECT_HERO, useHero } from "../context/Heros";
import styles from "../styles/Home.module.css";
import fetchHeros from "../utils/fetchHeros";
import { Card } from "antd";
import { Row, Col } from "antd";
import { useRouter } from "next/router";

const { Meta } = Card;

export default function Home() {
  const router = useRouter();
  const {
    state: { heros },
    dispatch,
  } = useHero();

  useEffect(() => {
    fetchHeros().then((res) => {
      console.log(res);
      dispatch({ type: FETCH_HEROS, payload: res });
    });
  }, []);

  const handleSelect = (id) => {
    dispatch({ type: SELECT_HERO, payload: id });
    router.push("/detail");
  };

  return (
    <Row className={styles.container} gutter={[12, 12]} justify="center">
      {heros.map(({ id, name, thumbnail: { path, extension } }, index) => (
        <Col
          className={styles.card_container}
          key={`car-key-${index}`}
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          xll={{ span: 4 }}
        >
          <Card
            hoverable
            className={styles.card}
            cover={
              <img
                alt={name}
                className={styles.card_image}
                src={path + "." + extension}
              />
            }
          >
            <Meta
              title={name}
              description={
                <span onClick={() => handleSelect(id)}>Detail...</span>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
