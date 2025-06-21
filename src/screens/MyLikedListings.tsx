import React, { useState } from 'react'
import styles from '../styles/MyLikedListings.module.css'
import ListingCard from '../components/ListingCard'

export default function myLikedListings() {

const listings = [
  { id: 1, name: 'Denim Jacket', price: '$45', condition: 'Lightly Used', size: 'M', username: 'clotheslover21', image: 'https://picsum.photos/seed/jacket1/300/250', profilePicture: 'https://picsum.photos/seed/profile1/40/40' },
  { id: 2, name: 'Summer Dress', price: '$30', condition: 'Like New', size: 'S', username: 'sunnyvibes', image: 'https://picsum.photos/seed/dress2/300/250', profilePicture: 'https://picsum.photos/seed/profile2/40/40' },
  { id: 3, name: 'Graphic Hoodie', price: '$25', condition: 'Well Used', size: 'L', username: 'urbanwear', image: 'https://picsum.photos/seed/hoodie3/300/250', profilePicture: 'https://picsum.photos/seed/profile3/40/40' },
  { id: 4, name: 'White Tee', price: '$10', condition: 'Heavily Used', size: 'XL', username: 'vintagefinds', image: 'https://picsum.photos/seed/tshirt4/300/250', profilePicture: 'https://picsum.photos/seed/profile4/40/40' },
  { id: 5, name: 'Slim Jeans', price: '$35', condition: 'Brand New', size: 'M', username: 'jeansjunkie', image: 'https://picsum.photos/seed/jeans5/300/250', profilePicture: 'https://picsum.photos/seed/profile5/40/40' },
  { id: 6, name: 'Leather Skirt', price: '$40', condition: 'Like New', size: 'XS', username: 'fashionfiend', image: 'https://picsum.photos/seed/skirt6/300/250', profilePicture: 'https://picsum.photos/seed/profile6/40/40' },
  { id: 7, name: 'Oversized Sweater', price: '$20', condition: 'Well Used', size: 'XXL', username: 'cozyqueen', image: 'https://picsum.photos/seed/sweater7/300/250', profilePicture: 'https://picsum.photos/seed/profile7/40/40' },
  { id: 8, name: 'Running Shorts', price: '$15', condition: 'Lightly Used', size: 'S', username: 'fitgear', image: 'https://picsum.photos/seed/shorts8/300/250', profilePicture: 'https://picsum.photos/seed/profile8/40/40' },
  { id: 9, name: 'Puffer Jacket', price: '$60', condition: 'Brand New', size: 'L', username: 'arcticstyle', image: 'https://picsum.photos/seed/puffer9/300/250', profilePicture: 'https://picsum.photos/seed/profile9/40/40' },
  { id: 10, name: 'Boho Blouse', price: '$28', condition: 'Like New', size: 'M', username: 'bohobabe', image: 'https://picsum.photos/seed/blouse10/300/250', profilePicture: 'https://picsum.photos/seed/profile10/40/40' },
  { id: 11, name: 'Corduroy Pants', price: '$32', condition: 'Lightly Used', size: 'L', username: 'retrofit', image: 'https://picsum.photos/seed/corduroy11/300/250', profilePicture: 'https://picsum.photos/seed/profile11/40/40' },
  { id: 12, name: 'Striped Polo', price: '$22', condition: 'Well Used', size: 'M', username: 'preppyguy', image: 'https://picsum.photos/seed/polo12/300/250', profilePicture: 'https://picsum.photos/seed/profile12/40/40' },
  { id: 13, name: 'Wool Coat', price: '$55', condition: 'Brand New', size: 'XL', username: 'coatscollector', image: 'https://picsum.photos/seed/wool13/300/250', profilePicture: 'https://picsum.photos/seed/profile13/40/40' },
  { id: 14, name: 'Chino Shorts', price: '$18', condition: 'Heavily Used', size: 'L', username: 'dailywear', image: 'https://picsum.photos/seed/chino14/300/250', profilePicture: 'https://picsum.photos/seed/profile14/40/40' },
  { id: 15, name: 'Silk Scarf', price: '$12', condition: 'Like New', size: 'XXS', username: 'accessoryaddict', image: 'https://picsum.photos/seed/silk15/300/250', profilePicture: 'https://picsum.photos/seed/profile15/40/40' },
  { id: 16, name: 'Bomber Jacket', price: '$50', condition: 'Well Used', size: 'M', username: 'mensfashion', image: 'https://picsum.photos/seed/bomber16/300/250', profilePicture: 'https://picsum.photos/seed/profile16/40/40' },
  { id: 17, name: 'Cargo Pants', price: '$38', condition: 'Lightly Used', size: 'XL', username: 'utilitywear', image: 'https://picsum.photos/seed/cargo17/300/250', profilePicture: 'https://picsum.photos/seed/profile17/40/40' },
  { id: 18, name: 'Tank Top', price: '$8', condition: 'Heavily Used', size: 'S', username: 'gymlife', image: 'https://picsum.photos/seed/tank18/300/250', profilePicture: 'https://picsum.photos/seed/profile18/40/40' },
  { id: 19, name: 'Maxi Skirt', price: '$26', condition: 'Like New', size: 'XS', username: 'longskirtlove', image: 'https://picsum.photos/seed/maxi19/300/250', profilePicture: 'https://picsum.photos/seed/profile19/40/40' },
  { id: 20, name: 'Fleece Hoodie', price: '$29', condition: 'Well Used', size: 'L', username: 'fleecefam', image: 'https://picsum.photos/seed/fleece20/300/250', profilePicture: 'https://picsum.photos/seed/profile20/40/40' },
  { id: 21, name: 'V-Neck Tee', price: '$11', condition: 'Lightly Used', size: 'M', username: 'simplefit', image: 'https://picsum.photos/seed/vneck21/300/250', profilePicture: 'https://picsum.photos/seed/profile21/40/40' },
  { id: 22, name: 'Button-Up Shirt', price: '$34', condition: 'Brand New', size: 'XXL', username: 'shirtcentral', image: 'https://picsum.photos/seed/buttonup22/300/250', profilePicture: 'https://picsum.photos/seed/profile22/40/40' },
  { id: 23, name: 'Athletic Leggings', price: '$27', condition: 'Like New', size: 'S', username: 'gymweargirl', image: 'https://picsum.photos/seed/leggings23/300/250', profilePicture: 'https://picsum.photos/seed/profile23/40/40' },
  { id: 24, name: 'Jean Shorts', price: '$16', condition: 'Well Used', size: 'M', username: 'shortnstyle', image: 'https://picsum.photos/seed/jeans24/300/250', profilePicture: 'https://picsum.photos/seed/profile24/40/40' },
  { id: 25, name: 'Turtleneck Sweater', price: '$37', condition: 'Lightly Used', size: 'L', username: 'turtleneckvibes', image: 'https://picsum.photos/seed/turtleneck25/300/250', profilePicture: 'https://picsum.photos/seed/profile25/40/40' },
  { id: 26, name: 'Plaid Shirt', price: '$23', condition: 'Well Used', size: 'XL', username: 'lumbercore', image: 'https://picsum.photos/seed/plaid26/300/250', profilePicture: 'https://picsum.photos/seed/profile26/40/40' },
  { id: 27, name: 'Blazer', price: '$42', condition: 'Like New', size: 'M', username: 'sharpdresser', image: 'https://picsum.photos/seed/blazer27/300/250', profilePicture: 'https://picsum.photos/seed/profile27/40/40' },
  { id: 28, name: 'Crop Top', price: '$14', condition: 'Heavily Used', size: 'XS', username: 'cropculture', image: 'https://picsum.photos/seed/crop28/300/250', profilePicture: 'https://picsum.photos/seed/profile28/40/40' },
  { id: 29, name: 'Raincoat', price: '$48', condition: 'Brand New', size: 'L', username: 'rainready', image: 'https://picsum.photos/seed/raincoat29/300/250', profilePicture: 'https://picsum.photos/seed/profile29/40/40' },
  { id: 30, name: 'Down Vest', price: '$36', condition: 'Lightly Used', size: 'M', username: 'layeredlife', image: 'https://picsum.photos/seed/down30/300/250', profilePicture: 'https://picsum.photos/seed/profile30/40/40' },
  { id: 31, name: 'Yoga Pants', price: '$24', condition: 'Like New', size: 'S', username: 'namastefit', image: 'https://picsum.photos/seed/yoga31/300/250', profilePicture: 'https://picsum.photos/seed/profile31/40/40' },
  { id: 32, name: 'Peacoat', price: '$53', condition: 'Brand New', size: 'XL', username: 'classiccoats', image: 'https://picsum.photos/seed/peacoat32/300/250', profilePicture: 'https://picsum.photos/seed/profile32/40/40' },
  { id: 33, name: 'Bell Bottoms', price: '$21', condition: 'Well Used', size: 'L', username: '70sstyle', image: 'https://picsum.photos/seed/bellbottoms33/300/250', profilePicture: 'https://picsum.photos/seed/profile33/40/40' },
  { id: 34, name: 'Linen Pants', price: '$33', condition: 'Lightly Used', size: 'M', username: 'breezyliving', image: 'https://picsum.photos/seed/linen34/300/250', profilePicture: 'https://picsum.photos/seed/profile34/40/40' },
  { id: 35, name: 'Zip Hoodie', price: '$26', condition: 'Like New', size: 'S', username: 'zipperfan', image: 'https://picsum.photos/seed/zipper35/300/250', profilePicture: 'https://picsum.photos/seed/profile35/40/40' },
  { id: 36, name: 'Track Jacket', price: '$31', condition: 'Well Used', size: 'XL', username: 'sportyseller', image: 'https://picsum.photos/seed/track36/300/250', profilePicture: 'https://picsum.photos/seed/profile36/40/40' },
  { id: 37, name: 'Embroidered Top', price: '$17', condition: 'Heavily Used', size: 'XS', username: 'bohoqueen', image: 'https://picsum.photos/seed/embroidered37/300/250', profilePicture: 'https://picsum.photos/seed/profile37/40/40' },
  { id: 38, name: 'Sequin Dress', price: '$52', condition: 'Brand New', size: 'M', username: 'glamgoddess', image: 'https://picsum.photos/seed/sequin38/300/250', profilePicture: 'https://picsum.photos/seed/profile38/40/40' },
  { id: 39, name: 'Knitted Vest', price: '$19', condition: 'Lightly Used', size: 'L', username: 'grandmacore', image: 'https://picsum.photos/seed/knitted39/300/250', profilePicture: 'https://picsum.photos/seed/profile39/40/40' },
  { id: 40, name: 'Joggers', price: '$28', condition: 'Well Used', size: 'XL', username: 'lazydayz', image: 'https://picsum.photos/seed/joggers40/300/250', profilePicture: 'https://picsum.photos/seed/profile40/40/40' },
  { id: 41, name: 'Wrap Dress', price: '$39', condition: 'Like New', size: 'S', username: 'chicwrap', image: 'https://picsum.photos/seed/wrap41/300/250', profilePicture: 'https://picsum.photos/seed/profile41/40/40' },
  { id: 42, name: 'Thermal Shirt', price: '$15', condition: 'Lightly Used', size: 'M', username: 'wintergear', image: 'https://picsum.photos/seed/thermal42/300/250', profilePicture: 'https://picsum.photos/seed/profile42/40/40' },
  { id: 43, name: 'Denim Overalls', price: '$46', condition: 'Well Used', size: 'L', username: 'overallsdaily', image: 'https://picsum.photos/seed/denim43/300/250', profilePicture: 'https://picsum.photos/seed/profile43/40/40' },
  { id: 44, name: 'Canvas Jacket', price: '$49', condition: 'Brand New', size: 'XXXL', username: 'canvasguy', image: 'https://picsum.photos/seed/canvas44/300/250', profilePicture: 'https://picsum.photos/seed/profile44/40/40' },
  { id: 45, name: 'Sleeveless Blouse', price: '$13', condition: 'Like New', size: 'XS', username: 'blousehouse', image: 'https://picsum.photos/seed/sleeveless45/300/250', profilePicture: 'https://picsum.photos/seed/profile45/40/40' },
  { id: 46, name: 'Faux Fur Coat', price: '$58', condition: 'Lightly Used', size: 'L', username: 'furluxe', image: 'https://picsum.photos/seed/fauxfur46/300/250', profilePicture: 'https://picsum.photos/seed/profile46/40/40' },
  { id: 47, name: 'Ripped Jeans', price: '$29', condition: 'Well Used', size: 'M', username: 'ruggedlooks', image: 'https://picsum.photos/seed/ripped47/300/250', profilePicture: 'https://picsum.photos/seed/profile47/40/40' },
  { id: 48, name: 'Lace Top', price: '$20', condition: 'Like New', size: 'S', username: 'softdetails', image: 'https://picsum.photos/seed/lace48/300/250', profilePicture: 'https://picsum.photos/seed/profile48/40/40' },
  { id: 49, name: 'Varsity Jacket', price: '$47', condition: 'Brand New', size: 'XL', username: 'campuscool', image: 'https://picsum.photos/seed/varsity49/300/250', profilePicture: 'https://picsum.photos/seed/profile49/40/40' },
  { id: 50, name: 'Pencil Skirt', price: '$22', condition: 'Well Used', size: 'M', username: 'officechic', image: 'https://picsum.photos/seed/pencil50/300/250', profilePicture: 'https://picsum.photos/seed/profile50/40/40' }
];

    return(
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Likes</h1>
                <div className={styles.ListingContainer}>
                    {listings.map(listing => {
                        return (
                            <ListingCard
                            key={listing.id}
                            profilePicture={listing.profilePicture}
                            username={listing.username}
                            image={listing.image}
                            name={listing.name}
                            price={listing.price}
                            condition={listing.condition}
                            size={listing.size}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}