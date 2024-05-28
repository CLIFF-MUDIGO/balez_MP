import { Button, Table, message } from 'antd';
import React, { useEffect } from 'react';
import ProductsForm from './ProductsForm';
import { useDispatch } from 'react-redux';
import { GetProducts } from '../../../apicalls/products';
import { setLoader } from '../../../redux/loadersSlice';

function Products() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = React.useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts();
      dispatch(setLoader(false));
      if (response.success) {
        // Add unique keys to each product
        const productsWithKeys = response.products.map((product) => ({ ...product, key: product._id }));
        setProducts(productsWithKeys);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {

        return <div className="flex gap-5">
          <i className="ri-delete-bin-line"></i>
          <i className="ri-edit-2-line"

            onClick={() => {
              setSelectedProduct(record);
              setShowProductForm(true);
            }}
          ></i>


        </div>
      }


    },
  ];



  useEffect(() => {
    getData();
  }, []); // Correct placement of the dependency array

  return (
    <div>
      <div className='flex justify-end mb-2 '>
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true)
          }}
        >
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && <ProductsForm
        showProductForm={showProductForm}
        setShowProductForm={setShowProductForm}
        selectedProduct={selectedProduct}
        getData={getData}
      />}
    </div>
  );
}

export default Products;
