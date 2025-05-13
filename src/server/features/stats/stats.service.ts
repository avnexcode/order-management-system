import { CategoryService } from "../category";
import { CustomerService } from "../customer";
import { OrderService } from "../order";
import { ProductService } from "../product";
import { TransactionService } from "../transaction";

export class StatsService {
  static getAllStats = async () => {
    const customersLength = await CustomerService.countAll();
    const categoriesLength = await CategoryService.countAll();
    const productsLength = await ProductService.countAll();
    const ordersLength = await OrderService.countAll();
    const transactionsLength = await TransactionService.countAll();

    const customersStats = {
      length: customersLength,
    };

    const categoriesStats = {
      length: categoriesLength,
    };

    const productsStats = {
      length: productsLength,
    };

    const ordersStats = {
      length: ordersLength,
    };

    const transactionsStats = {
      length: transactionsLength,
    };

    return {
      customer: customersStats,
      category: categoriesStats,
      product: productsStats,
      order: ordersStats,
      transaction: transactionsStats,
    };
  };
}
