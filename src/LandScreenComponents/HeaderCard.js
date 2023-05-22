import { Image } from "react-bootstrap";

export default function HeaderCard({ title, image, text }) {
  return (
    <div
      className="
      bg-white
      shadow-lg
      p-4
      rounded
      text-dark text-center
      feacture-card
      h-100
      "
    >
      <Image src={image} className="w-100" />
      <h4 className="mt-3">{title}</h4>
      <p>
        {text}
      </p>
    </div>
  );
}