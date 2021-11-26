import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const ItemPagination = (props) => {

    const {pages,active,noOfRecords,onPageChange,onPagePerRecordsChange} = props;
    const [pageList,setPageList] = useState([1]);

    useEffect(() => {
        let pageArr = [];
        for (let i = 0; i < pages; i++) {
            pageArr.push(i+1);
        }
        console.log("abcd::::",props, pageArr);
        setPageList(pageArr);

    },[props]);


    return (<>
            <div className="row">
                <div className="col-3">
                Records Per Page <select name="recordsPerPage" value={noOfRecords} onChange={(e) => onPagePerRecordsChange(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                </div>
                <div className="col-6">
                <Pagination>
                    <Pagination.First onClick={()=>onPageChange(1)}/>
                    <Pagination.Prev onClick={()=>{active>1?onPageChange(active-1):onPageChange(1)}}/>
                    {
                        pageList.map((page, number) =>{
                            return (<Pagination.Item key={page} active={page === active} onClick={()=>onPageChange(page)}>
                                {page}
                            </Pagination.Item>);
                        })
                    }
                    <Pagination.Next onClick={()=>{active<pages?onPageChange(active+1):onPageChange(pages)}}/>
                    <Pagination.Last onClick={()=>onPageChange(pages)}/>
                </Pagination>
                </div>
            </div>
    </>);
}

export default ItemPagination;