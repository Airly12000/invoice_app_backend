const express = require("express");
const data = require("../data/data");

const router = express.Router();

let Invoices = data;

// Test
router.get("/", (req, res) => {
  // res.send('Hello');
  res.json({ message: "GET REQUEST" });
});
// Test

router.get("/getInvoices", (req, res) => {
  if (Invoices) {
    res.json({ invoices: Invoices });
  } else {
    res.json({ message: "Request Failed" });
  }
});

router.get("/getInvoiceItems/:id", (req, res) => {
  const id = req.params.id;
  let invoice;
  for (let i = 0; i < Invoices.length; i++) {
    if (Invoices[i].id === id) {
      invoice = Invoices[i];
      break;
    }
  }
  if (invoice) {
    res.json({ invoice: [invoice] });
  } else {
    res.json({ message: "Request Failed" });
  }
});

router.post("/post", (req, res) => {
  const body = req.body;
  Invoices = [
    ...Invoices,
    {
      id: body.id,
      createdAt: body.createdAt,
      paymentDue: body.paymentDue,
      description: body.description,
      paymentTerms: body.paymentTerms,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      senderAddress: body.senderAddress,
      clientAddress: body.clientAddress,
      total: body.total,
      items: body.items,
      status: body.status,
    },
  ];
  res.json({ message: "Invoice created!" });
});

router.put("/updateInvoice/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  let invoice;
  for (let i = 0; i < Invoices.length; i++) {
    if (Invoices[i].id === id) {
      invoice = Invoices[i];
      Invoices.splice(i, 1);
      break;
    }
  }
  if (invoice) {
    invoice = {
      ...invoice,
      createdAt: body.createdAt,
      paymentDue: body.paymentDue,
      description: body.description,
      paymentTerms: body.paymentTerms,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      senderAddress: body.senderAddress,
      clientAddress: body.clientAddress,
      status: body.status,
      total: body.total,
      items: body.items,
    };
    Invoices = [...Invoices, invoice];
    res.json({ message: "Invoice updated!" });
  } else {
    res.json({ message: "Request Failed!" });
  }
});

router.put("/markPaid/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < Invoices.length; i++) {
    if (Invoices[i].id === id) {
      Invoices[i].status = "paid";
      break;
    }
  }
  res.json({ message: "Invoice updated!" });
});

router.delete("/deleteInvoice/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < Invoices.length; i++) {
    if (Invoices[i].id === id) {
      Invoices.splice(i, 1);
      break;
    }
  }
  res.json({ message: "Invoice deleted!" });
});

module.exports = router;
