const base = "https://api.dofusdu.de";

module.exports =

new class {

	constructor() {
 
		// AlmanaxApi
		/**
         * Renvoi l'amanax à la date indiquée
         * @param {string} date yyyy-mm-dd
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:{
         * bonus:{
         * description:string,
         * type:{
         * id:string,
         * name:string,
         * },
         * },
         * date:string,
         * tribute:{
         * item:{
         * ankama_id:number,
         * image_urls:{
         * hd:string,
         * hq:string,
         * icon:string,
         * sd:string,
         * },
         * name:string,
         * subtype:string,
         * },
         * quantity:number,
         * },
         * }
         * }>}
         */
		this.getAlmanaxDate = async (date) => {

			try {

				if (!date) {
					return { ok:false, statusText:"L'option 'date' est requise" };
				}
				if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
					return { ok:false, statusText:"Mauvais format sur l'option 'date', utilisez ce format : yyyy-mm-dd" };
				}

				const _ = await fetch(`${base}/dofus2/fr/almanax/${date}`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * Renvoi un tableau d'almanax • Par défaut : aujourd'hui + 6 jours
         * @param {Object} [options]
         * @param {string} [options.filterBonusType] - id almanax bonus type • peut être utilisé séparément et n’a aucun effet sur les autres paramètres
         * @param {string} [options.rangeFrom] - yyyy-mm-dd • Modifie la date de début, tout le reste est par défaut les 6 dates suivantes à partir de cette date de début • 35 jours maximum entre rangeFrom et rangeTo
         * @param {string} [options.rangeTo] - yyyy-mm-dd • Lorsqu'il est utilisé sans autre chose, il utilisera aujourd'hui comme date de début et ce paramètre comme fin • 35 jours maximum entre rangeFrom et rangeTo
         * @param {number} [options.rangeSize] - Taille du tableau • Lorqu'il est utilisé avec rangeFrom ou rangeTo, inutile de renseigner la date -> rangeFrom + rangeSize renvoi les (rangeSize)jours suivants -> rangeTo + rangeSize renvoi les (rangeSize)jours précédents
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * bonus:{
         * description:string,
         * type:{
         * id:string,
         * name:string,
         * },
         * },
         * date:string,
         * tribute:{
         * item:{
         * ankama_id:number,
         * image_urls:{
         * hd:string,
         * hq:string,
         * icon:string,
         * sd:string,
         * },
         * name:string,
         * subtype:string,
         * },
         * quantity:number,
         * },
         * }>,
         * }>}
         */
		this.getAlmanaxRange = async (options) => {

			try {

				let link = `${base}/dofus2/fr/almanax?`;

				if (options) {
					if (options.filterBonusType) { link += `filterBonusType=${options.filterBonusType}&`; }
					if (options.rangeFrom) { link += `rangeFrom=${options.rangeFrom}&`; }
					if (options.rangeTo) { link += `rangeTo=${options.rangeTo}&`; }
					if (options.rangeSize) { link += `rangeSize=${options.rangeSize}&`; }
				}

				const _ = await fetch(link);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}

				else {
					const json = await _.json();
					return { ok:true, result:json };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Consumbales
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * ankama_id:number,
         * name:string,
         * type:{
         * name:string,
         * id:number,
         * },
         * level:number,
         * image_urls:{
         * icon:string,
         * sd:string,
         * hq:string,
         * hd:string,
         * },
         * description:string,
         * effects:Array<{
         * int_minimum:number,
         * int_maximum:number,
         * type:{
         * name:string,
         * id:number,
         * is_meta:boolean,
         * is_active:boolean,
         * },
         * ignore_int_min:boolean,
         * ignore_int_max:boolean,
         * formatted:string,
         * }>,
         * }>,
         * }>}
         */
		this.getConsumables = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/fr/items/consumables/all`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json.items };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Cosmetics
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * ankama_id:number,
         * name:string,
         * type:{
         * name:string,
         * },
         * level:number,
         * image_urls:{
         * icon:string,
         * sd:string,
         * hq:string,
         * hd:string,
         * },
         * recipe:Array<{
         * item_ankama_id:number,
         * item_subtype:string,
         * quantity:number,
         * }>
         * }>
         * }>}
         */
		this.getCosmetics = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/fr/items/cosmetics/all`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json.items };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Equipments
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * ankama_id:number,
         * name:string,
         * type:{
         * name:string,
         * },
         * level:number,
         * image_urls:{
         * icon:string,
         * sd:string,
         * hq:string,
         * hd:string,
         * },
         * recipe:Array<{
         * item_ankama_id:number,
         * item_subtype:string,
         * quantity:number,
         * }>,
         * }>
         * }>}
         */
		this.getEquipments = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/fr/items/equipment/all`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json.items };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Meta
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<string>,
         * }>}
         */
		this.getMetaElements = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/meta/elements`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<string>,
         * }>}
         */
		this.getMetaTypes = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/meta/search/types`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * id:string,
         * name:string,
         * }>,
         * }>}
         */
		this.getMetaAlmanaxBonuses = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/meta/fr/almanax/bonuses`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Mounts
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * ankama_id:number,
         * name:string,
         * family_name:string,
         * image_urls:{
         * icon:string,
         * sd:string,
         * hq:string,
         * hd:string,
         * },
         * }>
         * }>}
         */
		this.getEquipments = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/fr/mounts/all`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json.items };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Quest items
		/**
         * @returns {Pormise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * ankama_id:number,
         * name:string,
         * type:{
         * name:string,
         * },
         * level:number,
         * image_urls:{
         * icon:string,
         * sd:string,
         * hq:string,
         * hd:string,
         * },
         * recipe:Array<{
         * item_ankama_id:number,
         * item_subtype:string,
         * quantity:number,
         * }>,
         * }>
         * }>}
         */
		this.getQuestItems = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/fr/items/quest/all`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json.items };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Ressources
		/**
         * @returns {Pormise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * ankama_id:number,
         * name:string,
         * type:{
         * name:string,
         * },
         * level:number,
         * image_urls:{
         * icon:string,
         * sd:string,
         * hq:string,
         * hd:string,
         * },
         * recipe:Array<{
         * item_ankama_id:number,
         * item_subtype:string,
         * quantity:number,
         * }>,
         * }>
         * }>}
         */
		this.getResources = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/fr/items/resources/all`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json.items };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Sets
		/**
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:Array<{
         * ankama_id:number,
         * name:string,
         * items:number,
         * level:number,
         * }>
         * }>}
         */
		this.getSets = async () => {

			try {

				const _ = await fetch(`${base}/dofus2/fr/sets/all`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					const json = await _.json();
					return { ok:true, result:json.items };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

		// Hooks
		/**
         * @param {{
         * discordWebhookURL:string,
         * subscriptions:Array<"dofus2-fr-official-news"|"dofus2-fr-official-changelog"|"dofus2-fr-official-devblog">,
         * whitelistWords?:Array<string>,
         * blacklistWords?:Array<string>,
         * preview_lenght?:number,
         * }} options
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:{
		 * id:string,
		 * whitelist:Array<string>,
		 * blacklist:Array<string>,
		 * subscriptions:Array<"dofus2-fr-official-news"|"dofus2-fr-official-changelog"|"dofus2-fr-official-devblog">,
		 * format:"discord",
		 * preview_lenght:number,
		 * created_at:string,
		 * last_fired_at:string,
		 * updated_at:string,
		 * },
         * }>}
         */
		this.createDiscordRssWebhook = async (options) => {

			try {

				if (!options || !options.discordWebhookURL || !options.subscriptions) {
					return { ok:false, statusText:"Les options 'discordWebhookURL' et 'subscriptions' sont requises" };
				}

				const _ = await fetch(`${base}/webhooks/rss`, {
					method:"POST",
					body:JSON.stringify({
						callback:options.discordWebhookURL,
						subscriptions:options.subscriptions,
						whitelist:options.whitelistWords ?? [],
						blacklist:options.blacklistWords ?? [],
						format:"discord",
						preview_lenght:options.preview_lenght ?? 2000,
					}),
				});

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}

				else {
					return { ok:true, result:await _.json() };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @param {{
         * discordWebhookURL:string,
         * subscriptions:Array<"DOFUSfr"|"AnkamaGames"|"DOFUSTouch"|"KTA_fr"|"DPLNofficiel"|"dofusbook_modo"|"JOL_Dofus">,
         * whitelistWords?:Array<string>,
         * blacklistWords?:Array<string>,
         * preview_lenght?:number,
         * }} options
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:{
		 * id:string,
		 * whitelist:Array<string>,
		 * blacklist:Array<string>,
		 * subscriptions:Array<"DOFUSfr"|"AnkamaGames"|"DOFUSTouch"|"KTA_fr"|"DPLNofficiel"|"dofusbook_modo"|"JOL_Dofus">,
		 * format:"discord",
		 * preview_lenght:number,
		 * created_at:string,
		 * last_fired_at:string,
		 * updated_at:string,
		 * },
         * }>}
         */
		this.createDiscordTwitterWebhook = async (options) => {

			try {

				if (!options || !options.discordWebhookURL || !options.subscriptions) {
					return { ok:false, statusText:"Les options 'discordWebhookURL' et 'subscriptions' sont requises" };
				}

				const _ = await fetch(`${base}/webhooks/twitter`, {
					method:"POST",
					body:JSON.stringify({
						callback:options.discordWebhookURL,
						subscriptions:options.subscriptions,
						whitelist:options.whitelistWords ?? [],
						blacklist:options.blacklistWords ?? [],
						format:"discord",
						preview_lenght:options.preview_lenght ?? 2000,
					}),
				});

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}

				else {
					return { ok:true, result:await _.json() };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @param {string} id
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:{
         * id:string,
         * whitelist:Array<string>|null,
         * blacklist:Array<string>|null,
         * subscriptions:Array<"dofus2-fr-official-news"|"dofus2-fr-official-changelog"|"dofus2-fr-official-devblog">,
         * format:"discord",
         * preview_length:number,
         * created_at:string,
         * last_fired_at:string,
         * updated_at:string,
         * }
         * }>}
         */
		this.getDiscordRssWebhook = async (id) => {

			try {

				if (!id) {
					return { ok:false, statusText:"L'option 'id' est requise" };
				}

				const _ = await fetch(`${base}/webhooks/rss/${id}`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					return { ok:true, result:await _.json() };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @param {string} id
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:{
         * id:string,
         * whitelist:Array<string>|null,
         * blacklist:Array<string>|null,
         * subscriptions:Array<"DOFUSfr"|"AnkamaGames"|"DOFUSTouch"|"KTA_fr"|"DPLNofficiel"|"dofusbook_modo"|"JOL_Dofus">,
         * format:"discord",
         * preview_length:number,
         * created_at:string,
         * last_fired_at:string,
         * updated_at:string,
         * }
         * }>}
         */
		this.getDiscordTwitterWebhook = async (id) => {

			try {

				if (!id) {
					return { ok:false, statusText:"L'option 'id' est requise" };
				}

				const _ = await fetch(`${base}/webhooks/twitter/${id}`);

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					return { ok:true, result:await _.json() };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @param {string} id
         * @param {{
         * subscriptions?:Array<"dofus2-fr-official-news"|"dofus2-fr-official-changelog"|"dofus2-fr-official-devblog">,
         * whitelistWords?:Array<string>,
         * blacklistWords?:Array<string>,
         * preview_lenght?:number,
         * }} options
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:{
         * id:string,
         * whitelist:Array<string>|null,
         * blacklist:Array<string>|null,
         * subscriptions:Array<"dofus2-fr-official-news"|"dofus2-fr-official-changelog"|"dofus2-fr-official-devblog">,
         * format:"discord",
         * preview_lenght:number,
         * created_at:string,
         * last_fired_at:string,
         * updated_at:string,
         * }
         * }>}
         */
		this.updateDiscordRssWebhook = async (id, options) => {

			try {

				if (!id) {
					return { ok:false, statusText:"L'option 'id' est requise" };
				}
				if (!options) {
					return { ok:false, statusText:"Aucune option n'a été indiquée" };
				}

				const body = {};
				if (options.blacklistWords) {
					body.blacklist = options.blacklistWords;
				}
				if (options.whitelistWords) {
					body.whitelist = options.whitelistWords;
				}
				if (options.preview_lenght) {
					body.preview_lenght = options.preview_lenght;
				}
				if (options.subscriptions) {
					body.subscriptions = options.subscriptions;
				}

				const _ = await fetch(`${base}/webhooks/rss/${id}`, {
					method:"PUT",
					body:JSON.stringify(body),
				});

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					return { ok:true, result:await _.json() };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @param {string} id
         * @param {{
         * subscriptions?:Array<"DOFUSfr"|"AnkamaGames"|"DOFUSTouch"|"KTA_fr"|"DPLNofficiel"|"dofusbook_modo"|"JOL_Dofus">,
         * whitelistWords?:Array<string>,
         * blacklistWords?:Array<string>,
         * preview_lenght?:number,
         * }} options
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:{
         * id:string,
         * whitelist:Array<string>|null,
         * blacklist:Array<string>|null,
         * subscriptions:Array<"DOFUSfr"|"AnkamaGames"|"DOFUSTouch"|"KTA_fr"|"DPLNofficiel"|"dofusbook_modo"|"JOL_Dofus">,
         * format:"discord",
         * preview_lenght:number,
         * created_at:string,
         * last_fired_at:string,
         * updated_at:string,
         * }
         * }>}
         */
		this.updateDiscordTwitterWebhook = async (id, options) => {

			try {

				if (!id) {
					return { ok:false, statusText:"L'option 'id' est requise" };
				}
				if (!options) {
					return { ok:false, statusText:"Aucune option n'a été indiquée" };
				}

				const body = {};
				if (options.blacklistWords) {
					body.blacklist = options.blacklistWords;
				}
				if (options.whitelistWords) {
					body.whitelist = options.whitelistWords;
				}
				if (options.preview_lenght) {
					body.preview_lenght = options.preview_lenght;
				}
				if (options.subscriptions) {
					body.subscriptions = options.subscriptions;
				}

				const _ = await fetch(`${base}/webhooks/twitter/${id}`, {
					method:"PUT",
					body:JSON.stringify(body),
				});

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					return { ok:true, result:await _.json() };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @param {string} id
         * @returns {Promise<{
         * ok:boolean,
         * statusText?:string,
         * error?:Error,
         * result?:"Ok",
         * }>}
         */
		this.deleteDiscordRssWebhook = async (id) => {

			try {

				if (!id) {
					return { ok:false, statusText:"L'option 'id' est requise" };
				}

				const _ = await fetch(`${base}/webhooks/rss/${id}`, {
					method:"DELETE",
				});

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					return { ok:true, result:"Ok" };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};
		/**
         * @param {string} id
         * @returns {Promise<{
        * ok:boolean,
        * statusText?:string,
        * error?:Error,
        * result?:"Ok",
        * }>}
        */
		this.deleteDiscordTwitterWebhook = async (id) => {

			try {

				if (!id) {
					return { ok:false, statusText:"L'option 'id' est requise" };
				}

				const _ = await fetch(`${base}/webhooks/twitter/${id}`, {
					method:"DELETE",
				});

				if (!_.ok) {
					return { ok:false, statusText:_.statusText };
				}
				else {
					return { ok:true, result:"Ok" };
				}

			}

			catch (error) {
				return { ok:false, error };
			}

		};

	}

};
