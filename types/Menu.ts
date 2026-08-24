export default interface Menu {
  title: string;
  slug: string;
  href?: string;
  children?: Menu[];
}
