import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
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
      {/* <Tailwind> turns the classes below into inline styles when the email is rendered.
          pixelBasedPreset uses px instead of rem, because many email clients ignore rem. */}
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Head />
        <Preview>Your order #{orderId} has been confirmed</Preview>

        <Body className="bg-[#f6f6f6] font-sans">
          <Container className="mx-auto max-w-120 rounded-lg bg-white px-6 py-8">
            <Heading className="m-0 mb-3 text-xl font-bold text-[#1a1a1a]">
              Thanks for your order, {customerName}!
            </Heading>

            <Text className="text-sm leading-5.5 text-[#444444]">
              We&apos;ve received your order and it&apos;s being processed.
              Here&apos;s a summary:
            </Text>

            <Section className="mt-4 rounded-lg bg-[#fafafa] p-4">
              <Text className="m-0 text-[13px] text-[#888888]">
                Order #{orderId}
              </Text>

              <Hr className="my-3 border-[#e6e6e6]" />

              {items.map((item, index) => (
                <Row key={index} className="mb-2">
                  <Column className="w-16">
                    {item.image && (
                      <Img
                        src={item.image}
                        width="56"
                        height="56"
                        alt={item.productName}
                        className="rounded-md object-cover"
                      />
                    )}
                  </Column>
                  <Column>
                    <Text className="m-0 text-sm font-semibold text-[#1a1a1a]">
                      {item.productName}
                    </Text>
                    <Text className="m-0 mt-0.5 text-xs text-[#888888]">
                      Qty: {item.quantity}
                    </Text>
                  </Column>
                  <Column className="text-right">
                    <Text className="m-0 text-sm text-[#1a1a1a]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </Column>
                </Row>
              ))}

              <Hr className="my-3 border-[#e6e6e6]" />

              <Row>
                <Column>
                  <Text className="text-sm font-bold text-[#1a1a1a]">
                    Total
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-sm font-bold text-[#1a1a1a]">
                    ₹{totalAmount.toFixed(2)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Text className="mt-6 text-xs text-[#999999]">
              If you have any questions about your order, just reply to this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
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
