import Image from 'next/image';

export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAhSURBVHgB7coxAQAACAJBtH/Wr6AVGBi5+QY4GVamxkx8GFID3TwM+SAAAAAASUVORK5CYII=';

type Props = {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const StackCard = (props: Props): JSX.Element => {
  const { label, src, alt, width, height, ...imageProps } = props;
  return (
    <div className="rounded-lg border">
      <p className="pt-8 text-center">{label}</p>
      <div className="flex size-40 items-center justify-center">
        <Image src={src} width={width} height={height} alt={alt} {...imageProps} />
      </div>
    </div>
  );
};

export default StackCard;
