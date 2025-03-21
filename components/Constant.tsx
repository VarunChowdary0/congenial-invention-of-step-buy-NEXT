import { SearchOperation } from "@/types/search";
import { Home, MapPin, Package, Pencil, WalletCardsIcon } from "lucide-react";
import { CgAdd } from "react-icons/cg";
import { MdSupportAgent } from "react-icons/md";

// export const server_url = "http://localhost:5000";
export const server_url = "http://localhost:5283";

export const admin = ['admin@stepbuy.com', 'super-admin@stepbuy.com'];

export const common_operation : SearchOperation[] = [
    {
        id: '1',
        title: 'Go to Home',
        description: 'Navigate to home page',
        icon: <Home className="w-4 h-4" />,
        action: '/'
    }
]

export const loggeredOps:SearchOperation[] = [
  {
    id: '11',
    title: 'Manage Address',
    description: 'Add, edit or delete your address',
    icon: <MapPin className="w-4 h-4" />,
    action:'/address'
  },
  {
    id: '12',
    title: 'Customer Support',
    description: 'Need help during your shopping journey or have any query',
    icon: <MdSupportAgent className="w-4 h-4" />,
    action:'/support'
  },
  {
    id: '13',
    title: 'Payments Options',
    description: 'Add/Update card, netbanking or UPI details',
    icon: <WalletCardsIcon className="w-4 h-4" />,
    action:'/payments'
  }
]


export const operations: SearchOperation[] = [
    ...common_operation,
    ...loggeredOps,
    {
      id: '2',
      title: 'View Orders',
      description: 'Check your orders',
      icon: <Package className="w-4 h-4" />,
      action:'/orders'
    }
]

  export const operations_admin: SearchOperation[] = [
    ...common_operation,
    ...loggeredOps,
    {
      id: '3',
      title: 'New Product',
      description: 'Add a new product to database',
      icon: <CgAdd className="w-4 h-4" />,
      action: '/admin/products/add'
    },
    {
      id: '4',
      title: 'Edit Product',
      description: 'Edit product information',
      icon: <Pencil className="w-4 h-4" />,
      action:'/admin/products/edit'
    },
    {
      id: '5',
      title: 'Manage Products',
      description: 'Add or edit Product Information',
      icon: <Pencil className="w-4 h-4" />,
      action:'/admin/products'
    },
  ]

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
