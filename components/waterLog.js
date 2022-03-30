import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const LeftContent = (props) => (
  <Avatar.Icon
    {...props}
    icon="calendar"
    color={"black"}
    style={{ backgroundColor: "#FFA07A" }}
  />
);

const WaterLog = () => (
  <>
    <Card>
      <Card.Title title="30/3/2022" left={LeftContent} />

      <Card.Content>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
    <Card>
      <Card.Title title="30/3/2022" left={LeftContent} />

      <Card.Content>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
    <Card>
      <Card.Title title="29/3/2022" left={LeftContent} />

      <Card.Content>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
    <Card>
      <Card.Title title="28/3/2022" left={LeftContent} />

      <Card.Content>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
  </>
);

export default WaterLog;
