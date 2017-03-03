import React from "react";
import FontAwesome from 'react-fontawesome';
import {connect} from "react-redux";
import Time from 'react-time';

import * as properties from "opencell/properties";
import {Link, withRouter} from "react-router";
import * as InvoiceActions from "modules/InvoiceModule";

@withRouter
@connect(store => {
	return {
		invoices: store.invoice.list
	}
})
export default class ListInvoices extends React.Component {
	componentDidMount() {
		this.props.dispatch(InvoiceActions.getInvoiceList());
	}
	showTime(time)
	{
		if(time!=null)
		{
			return (<Time value={time} format="DD/MM/YYYY"/>);
		}
		return "";
	}
	showPdfDownloadLink(invoice)
	{
		if(invoice.pdf!=null)
		{
			return (<a href={`data:application/force-download;charset=utf-16le;base64,${invoice.pdf}`} download={invoice.invoiceNumber+".pdf"}>
						<FontAwesome className="downloadbtn-shadow" name="file-pdf-o" size='2x'/>
				</a>);
		}
		return "";
	}
	setPaymentState(invoice)
	{
		let duedate = invoice.dueDate;
		let recordedInvoiceDto = invoice.recordedInvoiceDto;
		let state = "0";
		if(recordedInvoiceDto != null)
		{
			state = invoice.recordedInvoiceDto.matchingStatus;
		}
		if(state=="L" || state=="C")
		{
			return( <FontAwesome className="verify" name="check-circle" size='2x' /> );
		}else
		{
			let cur_date = Math.floor(Date.now());

			if(cur_date > duedate)
			{
				return( <FontAwesome className="unverify" name="exclamation-circle" size='2x' /> );
			}
			return( <FontAwesome className="search verify-glass" name="search" size='2x' /> );
		}
	}
	render() {
		const {invoices = []} = this.props;
		return (
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">
						<ol class="breadcrumb">
							<li><Link to={properties.invoices.path}>Invoices</Link></li>
							<li class="active">Invoice List</li>
						</ol>
						<div class="row">
							<div class="col-sm-8">
								<fieldset class="scheduler-border">
									<legend class="scheduler-border">Information</legend>
									<div class="row">
										<div class="col-sm-12">
											<label class="control-label col-sm-2">Parent:</label>
											<label class="control-label col-sm-5"></label>
											<label class="control-label col-sm-2">Status:</label>
											<label class="control-label col-sm-3"></label>
										</div>
										<div class="col-sm-12">
											<label class="control-label col-sm-2">Name</label>
											<label class="control-label col-sm-5"></label>
											<label class="control-label col-sm-2">Account type:</label>
											<label class="control-label col-sm-3"></label>
										</div>
										<div class="col-sm-12">
											<label class="control-label col-sm-2">Acc.nr</label>
											<label class="control-label col-sm-5"></label>
										</div>
										<div class="col-sm-12">
											<label class="control-label col-sm-2">Bill to</label>
											<label class="control-label col-sm-5"></label>
										</div>

									</div>
								</fieldset>
							</div>
							<div class="col-sm-4">
								<div class="col-sm-12">
									<label class="col-sm-7">Account balance</label>
									<label class="col-sm-5 text-right">12341234</label>
								</div>
								<div class="col-sm-12">
									<label class="col-sm-7">Total invoice balance</label>
									<label class="col-sm-5 text-right">12341234</label>
								</div>
								<div class="col-sm-12">
									<label class="col-sm-7">Last invoiced</label>
									<label class="col-sm-5 text-right">12341234</label>
								</div>
								<div class="col-sm-12">
									<label class="col-sm-7">Next invoice</label>
									<label class="col-sm-5 text-right">12341234</label>
								</div>
								<div class="col-sm-12">
									<label class="col-sm-7">Dunning level</label>
									<label class="col-sm-5 text-right">12341234</label>
								</div>
								<div class="col-sm-12">
									<label class="col-sm-7">Last dunning</label>
									<label class="col-sm-5 text-right">12341234</label>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="table-controls col-md-12 col-lg-12 vertical-middle">
								<div class="row">
									<div class="filter-container col-md-8">
										<div class="filter-group">
											<label for="sort-dropdown">Sort by: </label>
											<select id="sort-dropdown" class="form-control">
												<option>Invoice number</option>
												<option>Invoice date</option>
												<option>Due date</option>
												<option>Amount with taxes</option>
												<option>Payment method</option>
												<option>status</option>
												<option>Invoice</option>
											</select>
											<select id="rows-per-page" class="form-control">
												<option>20</option>
												<option>50</option>
												<option>100</option>
												<option>All</option>
											</select>
										</div>
									</div>
									<div class="pagination-container col-md-4">
										<nav aria-label="Customer List pagination" class="pagination-group">
											<ul class="pagination">
												<li>
													<a href="#" aria-label="Previous" class="pagination-first">
														<span aria-hidden="true"><i class="fa fa-fast-backward"/></span>
													</a>
												</li>
												<li>
													<a href="#" aria-label="Previous" class="pagination-previous">
														<span aria-hidden="true"><i class="fa fa-step-backward"/></span>
													</a>
												</li>
												<li><a href="#">1</a></li>
												<li><a href="#">2</a></li>
												<li><a href="#">3</a></li>
												<li><a href="#">4</a></li>
												<li><a href="#">5</a></li>
												<li>
													<a href="#" aria-label="Next" class="pagination-next">
														<span aria-hidden="true"><i class="fa fa-step-forward"/></span>
													</a>
												</li>
												<li>
													<a href="#" aria-label="Next" class="pagination-first">
														<span aria-hidden="true"><i class="fa fa-fast-forward"/></span>
													</a>
												</li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="table-responsive col-md-12">
								<table class="table table-hover">
									<thead>
									<tr>
										<th>Invoice number</th>
										<th>Invoice date</th>
										<th>Due date</th>
										<th>Amount with taxes</th>
										<th>Payment method</th>
										<th>status</th>
										<th>Invoice</th>
										<th>Action </th>
									</tr>
									</thead>
									<tbody>
										{(invoices.length > 0) ?
											invoices.map(invoice => {
												return (
													<tr key={invoice.invoiceId}>
														<td>{invoice.invoiceNumber}</td>
														<td>{this.showTime(invoice.invoiceDate)}</td>
														<td>{this.showTime(invoice.dueDate)}</td>
														<td>{invoice.amountWithTax}</td>
														<td></td>
														<td></td>
														<td>{this.showPdfDownloadLink(invoice)}</td>
														<td>{this.setPaymentState(invoice)}</td>
													</tr>
												);
											}) :
											(
												<tr>
													<td colSpan="8"><h1>No Invoices found yet.</h1></td>
												</tr>
											)
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}
