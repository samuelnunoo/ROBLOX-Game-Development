
interface ItemProperties {
    name: string;
    instance: Instance;
    price: number;
    rarity: "High" | "Low " | "Medium";
}



type ItemStore = Map<string, ItemProperties>
export {}