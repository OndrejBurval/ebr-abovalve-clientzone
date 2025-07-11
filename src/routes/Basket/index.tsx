import Layout from "@/layout";

import ProductList from "@/components/ProductList";
import Card from "@/components/ui/Card";
import BillingAddress from "@/components/BillingAddress";
import DeliveryAddress from "@/components/DeliveryAddress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import OrderConfirmModal from "@/components/OrderConfirmModal";
import Snackbar from "@mui/material/Snackbar";

import { useTranslation } from "react-i18next";
import { useBasket } from "@/hooks/useBasket";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { getPaymentTerm } from "@/data/payment";
import Product from "@/types/Product";
import calculateOriginalPrice from "@/utils/calcOriginalPrice";
import { usePriceAmountAfterDiscount } from "@/hooks/usePriceAfterDiscount";

const Basket = () => {
  const { t } = useTranslation();
  const basket = useBasket();
  const { userData, userIsLoading } = useUserData();

  /**
	const packingOptions = [
		{
			label: t("road"),
			value: "road",
		},
		{
			label: t("roadbox"),
			value: "roadbox",
		},
		{
			label: t("air"),
			value: "air",
		},
		{
			label: t("sea"),
			value: "sea",
		},
	];
     */

  const deliveryOptions = [
    {
      label: t("fca"),
      value: "FCA",
    },
    {
      label: t("cfr"),
      value: "CFR",
    },
  ];

  /*
	const currencyId = {
		CZK: "ced318a2-01d5-11e8-a178-42010a9c0002",
		EUR: "-99",
	};
    */

  // User input
  const [note, setNote] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  //const [packing, setPacking] = useState(packingOptions[0].value);
  const [delivery, setDelivery] = useState(deliveryOptions[0].value);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryAddressError, setDeliveryAddressError] = useState(false);

  // Modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Snacbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage] = useState("");

  const handleSubmit = async () => {
    if (!validateInput()) return;

    const finalBasketData: Product[] = basket.loadBasket();

    const globalDiscountPercentage = userData.globalDiscount || 0;
    console.log(globalDiscountPercentage);

    setOpenModal(true);
    setIsSubmitting(true);

    const data = {
      opportunity_type: "order",
      total_cost: basket.getTotalPrice(
        finalBasketData,
        globalDiscountPercentage
      ),
      currency: "CZK",
      shipping: delivery,
      user_note: note,
      order_number: orderNumber,
      cfr_address: deliveryAddress ? deliveryAddress : null,
      order_items: finalBasketData.map((item) => ({
        product: item.id,
        amount: item.quantity,
        price: usePriceAmountAfterDiscount(item.price, [
          globalDiscountPercentage,
        ]),
        name: item.name,
        original_price: calculateOriginalPrice(item.price, [
          userData.account.default_discount,
        ]),
        certificate: item.certificate || false,
      })),
    };

    try {
      const res = await fetch("/api/platform/custom/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Orders network response error");
      }

      basket.clear();
      setIsCompleted(true);
    } catch (e) {
      console.error(e);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateInput = () => {
    if (!deliveryAddress) {
      setDeliveryAddressError(true);
      return false;
    } else {
      setDeliveryAddressError(false);
    }
    /**
		if (!packing) {
			setOpenSnackbar(true);
			setSnackbarMessage(t("vyberteBaleni"));
			return false;
		}
         */

    return true;
  };

  return (
    <Layout title={`${t("kosik")}`} className="basket">
      <Breadcrumb links={[{ href: "/kosik", label: t("kosik") }]} />
      <div className="basket--subtitle">{t("kosikPodnadpis")}</div>
      <div className="basket--wrapper">
        {basket.items.length > 0 && !userIsLoading ? (
          <>
            <ProductList
              discount={userData.account.default_discount}
              interactive
            />

            <div className="basket--data">
              <Card isLoading={userIsLoading} className="userData--connected">
                {!userIsLoading && userData.account && (
                  <>
                    <div className="billing">
                      <strong>{t("fakturacniAdresa")}</strong>
                      <BillingAddress
                        data={userData.account}
                        disableEdit={!userData.contact.portal_priv_admin}
                      />
                    </div>

                    <div className="delivery">
                      <strong> {t("dorucovaciAdresa")}</strong>
                      <DeliveryAddress
                        data={userData.account}
                        disableEdit={!userData.contact.portal_priv_admin}
                      />
                    </div>
                  </>
                )}
              </Card>
              <div className="userInput">
                <Card className="selectCard">
                  <div className="payment--input">
                    <label>{t("platba")}</label>
                    <input
                      type="text"
                      name="payment"
                      id="payment"
                      value={t(getPaymentTerm(userData.account.payment_code))}
                      readOnly
                    />
                  </div>

                  <div className="order-number--input">
                    <label>{t("cisloObjednavkyKosik")}</label>
                    <input
                      type="text"
                      name="orderNumber"
                      id="orderNumber"
                      onChange={(e) => setOrderNumber(e.target.value)}
                      value={orderNumber}
                    />
                  </div>

                  <div className="delivery--input">
                    <label>{t("doprava")}</label>
                    <Autocomplete
                      disableClearable
                      disablePortal
                      defaultValue={deliveryOptions[0].label}
                      id="delivery"
                      onChange={(_: any, newValue: string | null) => {
                        setDelivery(
                          deliveryOptions.find(
                            (option) => option.label === newValue
                          ).value
                        );
                      }}
                      options={deliveryOptions.map((option) => option.label)}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {delivery === "CFR" && (
                      <div className="info">{t("cfrInfo")}</div>
                    )}
                  </div>

                  {/**
									<div className="delivery--input">
										<label>{t("baleni")}</label>
										<Autocomplete
											disableClearable
											disablePortal
											defaultValue={packingOptions[0].label}
											id="packing"
											onChange={(_: any, newValue: string | null) => {
												setPacking(
													packingOptions.find(
														(option) => option.label === newValue
													).value
												);
											}}
											options={packingOptions.map((option) => option.label)}
											renderInput={(params) => (
												<TextField {...params}> </TextField>
											)}
										/>
									</div>
                                */}

                  <div className="order-number--input">
                    <label>{t("dorucovaciAdresa")} *</label>
                    <input
                      type="text"
                      name="cfrAddress"
                      id="cfrAddress"
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      value={deliveryAddress}
                      className={deliveryAddressError ? "error--input" : ""}
                      required
                    />
                    {deliveryAddressError && (
                      <div className="error--label">{t("povinne")}</div>
                    )}
                  </div>

                  <div className="note--input">
                    <label>{t("poznamkaObjednavky")}</label>
                    <textarea
                      value={note}
                      rows={3}
                      onChange={(e) => setNote(e.target.value)}></textarea>
                  </div>

                  <div className="btn--wrapper">
                    <button className="btn" onClick={handleSubmit}>
                      {t("odeslatObjednavku")}
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <OrderConfirmModal
        open={openModal}
        hasError={hasError}
        isCompleted={isCompleted}
        isSubmitting={isSubmitting}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        className="snackbar-error"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Layout>
  );
};

export default Basket;
