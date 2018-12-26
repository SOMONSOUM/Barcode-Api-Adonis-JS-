"use strict";

const Product = use("App/Models/Product");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response }) {
    try {
      let products = await Product.all({
        attributes: ["id", "name", "upc", "imageUrl"],
        order: [["id", "ASC"]]
      });
      response.json({
        result: "ok",
        data: products,
        message: "Query list of Products successfully"
      });
    } catch (error) {
      response.json({
        result: "failed",
        data: {},
        message: `Query list of Tasks failed. Error: ${error}`
      });
    }
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({ request, response }) {
    try {
      let { name, upc, imageUrl } = request.body;
      let newProduct = await Product.create(
        {
          name,
          upc,
          imageUrl
        },
        {
          fields: ["name", "upc", "imageUrl"]
        }
      );
      if (newProduct) {
        response.json({
          result: "ok",
          data: newProduct,
          message: "Create a new Task successfully"
        });
      } else {
        response.json({
          result: "ok",
          data: {},
          message: `Create a new Task failed`
        });
      }
    } catch (error) {
      response.json({
        result: "failed",
        data: {},
        message: `Create a new Task failed. Error: ${error}`
      });
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request, response }) {
    try {
      let { id } = request.params;
      let product = await Product.find(id);
      response.json({
        result: "ok",
        data: product,
        message: "Query list of Product successfully"
      });
    } catch (error) {
      response.json({
        result: "failed",
        data: {},
        message: `Cannot update a Product. Error: ${error}`
      });
    }
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response }) {
    try {
      let { id } = request.params;
      const product = await Product.find(id);
      product.merge(request.only(["name", "upc", "imageUrl"]));
      await product.save();
      response.json({
        result: "ok",
        data: product,
        message: "Update a Product successfully"
      });
    } catch (error) {
      response.json({
        result: "failed",
        data: {},
        message: `Cannot update a Product. Error: ${error}`
      });
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete({ request, response }) {
    try {
      const { id } = request.params;
      const product = await Product.find(id);
      await product.delete();
      response.json({
        result: "ok",
        message: "Delete a Product successfully",
        count: product
      });
    } catch (error) {
      response.json({
        result: "failed",
        data: {},
        message: `Delete a Product failed. Error: ${error}`
      });
    }
  }
}

module.exports = ProductController;
