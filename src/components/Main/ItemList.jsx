import React from "react";
import Item from './Item'

const Itemlist =({items})=>{

    return(
        <div className="item-list">

            {
                items.map((prod)=>{
                    return <Item prod={prod} key={prod.id}/>
                })
            }

        </div>
    );
};

export default Itemlist;