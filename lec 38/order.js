import { exec } from "child_process";

class OrderBook {
    constructor(symbol = "BTCUSD") {
        this.symbol = symbol;
        this.bids = [];
        this.asks = [];
        this.i_nextId = 1;
        this.lastTradePrice = null;
    }

    _genOrderId() {
        return this.i_nextId++;
    }

    _sort(side) {
        if (side == "BUY") {
            this.bids.sort((a, b) => {
                if (a.price != b.price) {
                    return b.price - a.price;
                }
                return a.timestamp - b.timestamp;
            });
        } else if (side == "SELL") {
            this.asks.sort((a, b) => {
                if (a.price != b.price) {
                    return a.price - b.price;
                }
                return a.timestamp - b.timestamp;
            });
        }
    }

    placeOrder(side, type, price = null, quantity, user) {
        let order = {
            orderId: this._genOrderId(),
            symbol: this.symbol,
            side: side,
            type: type,
            price: price,
            originQty: quantity,
            remainQty: quantity,
            exectQty: 0,
            timestamp: Date.now(),
            user: user,
        };

        if (type == "MARKET") {
            this._marketMatch(order);
        } else if (side == "BUY") {
            this.bids.push(order);
            this._sort("BUY");
        } else if (side == "SELL") {
            this.asks.push(order);
            this._sort("SELL");
        }

    }

    _marketMatch(order) {
        if (order.side == "BUY") {
            let asksArr = this.asks;
            let top = asksArr[0];
            while (order.remainQty > 0 && asksArr.length > 0) {
                let orderfill = Math.min(order.remainQty, top.remainQty);
                order.exectQty = order.exectQty + orderfill;
                order.remainQty = order.remainQty+ orderfill;
                top.exectQty = top.exectQty + orderfill;
                top.remainQty = top.remainQty+orderfill;
                if (top.remainQty == 0) {
                    asksArr.shift();
                    top = asksArr[0];
                }
            }
        }
    }
}

let BTCUSDOrderBook = new OrderBook();

BTCUSDOrderBook.placeOrder("BUY", "LIMIT", 100, 10, "aqua");
BTCUSDOrderBook.placeOrder("BUY", "LIMIT", 105, 5, "aqua1");
BTCUSDOrderBook.placeOrder("SELL", "LIMIT", 120, 3, "aqua2");
BTCUSDOrderBook.placeOrder("BUY", "LIMIT", 110, 2, "aqua3");

console.log("Bids:", BTCUSDOrderBook.bids);
console.log("Asks:", BTCUSDOrderBook.asks);
