import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

type OrderItem = {
  productName: string;
  quantity: number;
  price: number;
  image?: string | null;
};

type OrderConfirmationEmailProps = {
  customerName: string;
  orderId: string;
  totalAmount: number;
  items: OrderItem[];
};

export default function OrderConfirmationEmail({
  customerName,
  orderId,
  totalAmount,
  items,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order #{orderId} has been confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Thanks for your order, {customerName}!</Heading>

          <Text style={text}>
            We've received your order and it's being processed. Here's a
            summary:
          </Text>

          <Section style={orderBox}>
            <Text style={orderIdText}>Order #{orderId}</Text>

            <Hr style={hr} />

            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={{ width: "64px" }}>
                  {item.image && (
                    <Img
                      src={item.image}
                      width="56"
                      height="56"
                      alt={item.productName}
                      style={itemImage}
                    />
                  )}
                </Column>
                <Column>
                  <Text style={itemName}>{item.productName}</Text>
                  <Text style={itemMeta}>Qty: {item.quantity}</Text>
                </Column>
                <Column style={{ textAlign: "right" }}>
                  <Text style={itemPrice}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={hr} />

            <Row>
              <Column>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column style={{ textAlign: "right" }}>
                <Text style={totalValue}>₹{totalAmount.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Text style={footer}>
            If you have any questions about your order, just reply to this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

OrderConfirmationEmail.PreviewProps = {
  customerName: "Aarav",
  orderId: "ckx1a2b3c",
  totalAmount: 1499,
  items: [
    { productName: "Classic White Shirt", quantity: 1, price: 999, image: "" },
    { productName: "Denim Jacket", quantity: 1, price: 500, image: "" },
  ],
} satisfies OrderConfirmationEmailProps;

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "480px",
  borderRadius: "8px",
};

const heading = {
  fontSize: "20px",
  fontWeight: "700" as const,
  color: "#1a1a1a",
  margin: "0 0 12px",
};

const text = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#444444",
};

const orderBox = {
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "16px",
};

const orderIdText = {
  fontSize: "13px",
  color: "#888888",
  margin: "0",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "12px 0",
};

const itemRow = {
  marginBottom: "8px",
};

const itemImage = {
  borderRadius: "6px",
  objectFit: "cover" as const,
};

const itemName = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#1a1a1a",
  margin: "0",
};

const itemMeta = {
  fontSize: "12px",
  color: "#888888",
  margin: "2px 0 0",
};

const itemPrice = {
  fontSize: "14px",
  color: "#1a1a1a",
  margin: "0",
};

const totalLabel = {
  fontSize: "14px",
  fontWeight: "700" as const,
  color: "#1a1a1a",
};

const totalValue = {
  fontSize: "14px",
  fontWeight: "700" as const,
  color: "#1a1a1a",
};

const footer = {
  fontSize: "12px",
  color: "#999999",
  marginTop: "24px",
};
