import { IMAGES } from "../../../../../../config/assetsConfig";

export default function ImageRenderer({ url, alt, className }) {
    return (
        <img 
            src={url} 
            alt={alt || IMAGES.NO_ALT}
            className={className}
            loading="lazy"
            decoding="async"
        />
    );
}