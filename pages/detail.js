import { Row, Col, List } from "antd";
import { useEffect, useState } from "react";
import { useHero } from "../context/Heros";
import styles from "../styles/Detail.module.css";
const Detail = () => {
  const [data, setData] = useState([]);
  const {
    state: { selected_hero },
  } = useHero();

  console.log("seleced hero -->", selected_hero);

  let {
    name,
    description,
    thumbnail: { path, extension },
    comics: { items },
  } = selected_hero || {
    name: "",
    description: "",
    thumbnail: { path: "", extension: "" },
    comics: { items: [] },
  };

  useEffect(() => {
    const _data = items.slice(0, 10).map((comic) => {
      let { name } = comic;
      let [title, date_series] = name?.split("(");
      let [date, series] = date_series?.split(")");
      return { ...comic, title, date, series };
    });
    setData(_data);
  }, [items]);
  console.log("*****ITEMS *******", data);

  return (
    <div className={styles.container}>
      <Row className={styles.info}>
        <Col
          sm={{ span: 24 }}
          md={{ span: 8 }}
          className={styles.image_container}
        >
          <img
            className={styles.info_image}
            alt={name}
            src={path + "." + extension}
          />
        </Col>

        <Col
          sm={{ span: 24 }}
          md={{ span: 14, push: 1 }}
          className={styles.info_detail}
        >
          <div className={styles.detail_name}>
            <div className={styles.label}>
              <span>Name</span>
              <span>:</span>
            </div>
            <span>{name}</span>
          </div>
          <div className={styles.detail_description}>
            <div className={styles.label}>
              <span>Description</span>
              <span>:</span>
            </div>

            <span style={{ wordBreak: "break-word" }}>
              {description || "No Description"}
            </span>
          </div>
        </Col>
      </Row>
      <div className={styles.comics_container}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          header={<span className={styles.list_header}>List of Comics</span>}
          renderItem={({ title, date, series }) => (
            <List.Item>
              <List.Item.Meta
                title={title}
                description={
                  <>
                    <span className={styles.comic_date}>Date: {date}</span>
                    <span className={styles.comic_serie}>Series: {series}</span>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Detail;
