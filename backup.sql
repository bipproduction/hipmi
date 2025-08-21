--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BeritaInvestasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."BeritaInvestasi" (
    id text NOT NULL,
    title text NOT NULL,
    deskripsi text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imagesId" text,
    "investasiId" text NOT NULL,
    "imageId" text
);


ALTER TABLE public."BeritaInvestasi" OWNER TO bip;

--
-- Name: BusinessMaps; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."BusinessMaps" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "namePin" text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "authorId" text,
    "portofolioId" text,
    "imageId" text,
    "pinId" text
);


ALTER TABLE public."BusinessMaps" OWNER TO bip;

--
-- Name: DokumenInvestasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."DokumenInvestasi" (
    id text NOT NULL,
    title text NOT NULL,
    url text,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "investasiId" text,
    "fileId" text
);


ALTER TABLE public."DokumenInvestasi" OWNER TO bip;

--
-- Name: Donasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Donasi" (
    id text NOT NULL,
    title text NOT NULL,
    target text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "publishTime" timestamp(3) without time zone,
    catatan text,
    progres text DEFAULT '0'::text,
    terkumpul text DEFAULT '0'::text,
    "namaBank" text,
    rekening text,
    "akumulasiPencairan" integer DEFAULT 0,
    "totalPencairan" integer DEFAULT 0,
    "authorId" text,
    "imagesId" text,
    "donasiMaster_KategoriId" text,
    "donasiMaster_DurasiId" text,
    "donasiMaster_StatusDonasiId" text DEFAULT '2'::text,
    "imageId" text
);


ALTER TABLE public."Donasi" OWNER TO bip;

--
-- Name: DonasiMaster_Bank; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."DonasiMaster_Bank" (
    id text NOT NULL,
    name text NOT NULL,
    norek text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DonasiMaster_Bank" OWNER TO bip;

--
-- Name: DonasiMaster_Durasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."DonasiMaster_Durasi" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DonasiMaster_Durasi" OWNER TO bip;

--
-- Name: DonasiMaster_Kategori; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."DonasiMaster_Kategori" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DonasiMaster_Kategori" OWNER TO bip;

--
-- Name: DonasiMaster_StatusDonasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."DonasiMaster_StatusDonasi" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DonasiMaster_StatusDonasi" OWNER TO bip;

--
-- Name: DonasiMaster_StatusInvoice; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."DonasiMaster_StatusInvoice" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DonasiMaster_StatusInvoice" OWNER TO bip;

--
-- Name: Donasi_Cerita; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Donasi_Cerita" (
    id text NOT NULL,
    pembukaan text NOT NULL,
    cerita text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imagesId" text,
    "donasiId" text,
    "imageId" text
);


ALTER TABLE public."Donasi_Cerita" OWNER TO bip;

--
-- Name: Donasi_Invoice; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Donasi_Invoice" (
    id text NOT NULL,
    nominal text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "donasiId" text,
    "donasiMaster_BankId" text,
    "donasiMaster_StatusInvoiceId" text DEFAULT '3'::text,
    "authorId" text,
    "imagesId" text,
    "imageId" text
);


ALTER TABLE public."Donasi_Invoice" OWNER TO bip;

--
-- Name: Donasi_Kabar; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Donasi_Kabar" (
    id text NOT NULL,
    title text NOT NULL,
    deskripsi text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "donasiId" text,
    "imagesId" text,
    "imageId" text
);


ALTER TABLE public."Donasi_Kabar" OWNER TO bip;

--
-- Name: Donasi_Notif; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Donasi_Notif" (
    id text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text,
    "donasi_KabarId" text
);


ALTER TABLE public."Donasi_Notif" OWNER TO bip;

--
-- Name: Donasi_PencairanDana; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Donasi_PencairanDana" (
    id text NOT NULL,
    "nominalCair" integer NOT NULL,
    title text NOT NULL,
    deskripsi text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "donasiId" text,
    "imagesId" text,
    "imageId" text
);


ALTER TABLE public."Donasi_PencairanDana" OWNER TO bip;

--
-- Name: Donasi_TemporaryCreate; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Donasi_TemporaryCreate" (
    id text NOT NULL,
    title text NOT NULL,
    target text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imagesId" text,
    "donasiMaster_KategoriId" text,
    "donasiMaster_DurasiId" text,
    "imageId" text
);


ALTER TABLE public."Donasi_TemporaryCreate" OWNER TO bip;

--
-- Name: Event; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Event" (
    id text NOT NULL,
    title text NOT NULL,
    lokasi text NOT NULL,
    tanggal timestamp(3) without time zone,
    deskripsi text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    catatan text,
    "tanggalSelesai" timestamp(3) without time zone,
    "isArsip" boolean DEFAULT false,
    "authorId" text,
    "eventMaster_StatusId" text DEFAULT '2'::text,
    "eventMaster_TipeAcaraId" integer
);


ALTER TABLE public."Event" OWNER TO bip;

--
-- Name: EventMaster_Status; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."EventMaster_Status" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."EventMaster_Status" OWNER TO bip;

--
-- Name: EventMaster_TipeAcara; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."EventMaster_TipeAcara" (
    id integer NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."EventMaster_TipeAcara" OWNER TO bip;

--
-- Name: EventMaster_TipeAcara_id_seq; Type: SEQUENCE; Schema: public; Owner: bip
--

CREATE SEQUENCE public."EventMaster_TipeAcara_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EventMaster_TipeAcara_id_seq" OWNER TO bip;

--
-- Name: EventMaster_TipeAcara_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bip
--

ALTER SEQUENCE public."EventMaster_TipeAcara_id_seq" OWNED BY public."EventMaster_TipeAcara".id;


--
-- Name: EventSponsor; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."EventSponsor" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL,
    "fileName" text NOT NULL,
    "fileExt" text,
    "fileId" text NOT NULL,
    "auhtorId" text,
    "eventId" text
);


ALTER TABLE public."EventSponsor" OWNER TO bip;

--
-- Name: EventTransaksi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."EventTransaksi" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    nominal integer NOT NULL,
    "masterBankId" text,
    status text NOT NULL,
    "transferImageId" text,
    "authorId" text,
    "eventId" text,
    "eventSponsorId" text
);


ALTER TABLE public."EventTransaksi" OWNER TO bip;

--
-- Name: Event_Peserta; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Event_Peserta" (
    id text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isPresent" boolean DEFAULT false NOT NULL,
    "eventId" text,
    "userId" text
);


ALTER TABLE public."Event_Peserta" OWNER TO bip;

--
-- Name: ForumMaster_KategoriReport; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ForumMaster_KategoriReport" (
    id integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    deskripsi text NOT NULL
);


ALTER TABLE public."ForumMaster_KategoriReport" OWNER TO bip;

--
-- Name: ForumMaster_KategoriReport_id_seq; Type: SEQUENCE; Schema: public; Owner: bip
--

CREATE SEQUENCE public."ForumMaster_KategoriReport_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ForumMaster_KategoriReport_id_seq" OWNER TO bip;

--
-- Name: ForumMaster_KategoriReport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bip
--

ALTER SEQUENCE public."ForumMaster_KategoriReport_id_seq" OWNED BY public."ForumMaster_KategoriReport".id;


--
-- Name: ForumMaster_StatusPosting; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ForumMaster_StatusPosting" (
    id integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status text NOT NULL
);


ALTER TABLE public."ForumMaster_StatusPosting" OWNER TO bip;

--
-- Name: ForumMaster_StatusPosting_id_seq; Type: SEQUENCE; Schema: public; Owner: bip
--

CREATE SEQUENCE public."ForumMaster_StatusPosting_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ForumMaster_StatusPosting_id_seq" OWNER TO bip;

--
-- Name: ForumMaster_StatusPosting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bip
--

ALTER SEQUENCE public."ForumMaster_StatusPosting_id_seq" OWNED BY public."ForumMaster_StatusPosting".id;


--
-- Name: Forum_Komentar; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Forum_Komentar" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    komentar text NOT NULL,
    "forum_PostingId" text,
    "authorId" text
);


ALTER TABLE public."Forum_Komentar" OWNER TO bip;

--
-- Name: Forum_Posting; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Forum_Posting" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "publishAt" timestamp(3) without time zone,
    diskusi text NOT NULL,
    "authorId" text,
    "forumMaster_StatusPostingId" integer
);


ALTER TABLE public."Forum_Posting" OWNER TO bip;

--
-- Name: Forum_ReportKomentar; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Forum_ReportKomentar" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    deskripsi text,
    "forumMaster_KategoriReportId" integer,
    "forum_KomentarId" text,
    "userId" text
);


ALTER TABLE public."Forum_ReportKomentar" OWNER TO bip;

--
-- Name: Forum_ReportPosting; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Forum_ReportPosting" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    deskripsi text,
    "forumMaster_KategoriReportId" integer,
    "forum_PostingId" text,
    "userId" text
);


ALTER TABLE public."Forum_ReportPosting" OWNER TO bip;

--
-- Name: Images; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Images" (
    id text NOT NULL,
    url text NOT NULL,
    label text DEFAULT 'null'::text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Images" OWNER TO bip;

--
-- Name: Investasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Investasi" (
    id text NOT NULL,
    title text NOT NULL,
    "targetDana" text NOT NULL,
    "hargaLembar" text NOT NULL,
    "totalLembar" text NOT NULL,
    roi text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "countDown" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "authorId" text,
    catatan text,
    "sisaLembar" text NOT NULL,
    "lembarTerbeli" text DEFAULT '0'::text,
    progress text DEFAULT '0'::text,
    "masterPeriodeDevidenId" text,
    "masterPembagianDevidenId" text,
    "masterPencarianInvestorId" text,
    "imagesId" text,
    "masterStatusInvestasiId" text DEFAULT '2'::text,
    "masterProgresInvestasiId" text,
    "imageId" text,
    "prospektusFileId" text
);


ALTER TABLE public."Investasi" OWNER TO bip;

--
-- Name: InvestasiMaster_StatusInvoice; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."InvestasiMaster_StatusInvoice" (
    id text NOT NULL,
    name text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."InvestasiMaster_StatusInvoice" OWNER TO bip;

--
-- Name: Investasi_Invoice; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Investasi_Invoice" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    nominal text NOT NULL,
    "lembarTerbeli" text NOT NULL,
    "investasiId" text,
    "masterBankId" text,
    "statusInvoiceId" text,
    "authorId" text,
    "imagesId" text,
    "imageId" text
);


ALTER TABLE public."Investasi_Invoice" OWNER TO bip;

--
-- Name: Job; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Job" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isArsip" boolean DEFAULT false NOT NULL,
    catatan text,
    title text NOT NULL,
    content text NOT NULL,
    deskripsi text NOT NULL,
    "authorId" text,
    "masterStatusId" text DEFAULT '2'::text,
    "imageId" text
);


ALTER TABLE public."Job" OWNER TO bip;

--
-- Name: KodeOtp; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."KodeOtp" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    nomor text NOT NULL,
    otp integer NOT NULL
);


ALTER TABLE public."KodeOtp" OWNER TO bip;

--
-- Name: MasterBank; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterBank" (
    id text NOT NULL,
    "namaBank" text NOT NULL,
    "namaAkun" text NOT NULL,
    norek text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MasterBank" OWNER TO bip;

--
-- Name: MasterBidangBisnis; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterBidangBisnis" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MasterBidangBisnis" OWNER TO bip;

--
-- Name: MasterKategoriApp; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterKategoriApp" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL,
    value text
);


ALTER TABLE public."MasterKategoriApp" OWNER TO bip;

--
-- Name: MasterPembagianDeviden; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterPembagianDeviden" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MasterPembagianDeviden" OWNER TO bip;

--
-- Name: MasterPencarianInvestor; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterPencarianInvestor" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MasterPencarianInvestor" OWNER TO bip;

--
-- Name: MasterPeriodeDeviden; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterPeriodeDeviden" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MasterPeriodeDeviden" OWNER TO bip;

--
-- Name: MasterProgresInvestasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterProgresInvestasi" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MasterProgresInvestasi" OWNER TO bip;

--
-- Name: MasterStatus; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterStatus" (
    id text NOT NULL,
    name text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MasterStatus" OWNER TO bip;

--
-- Name: MasterStatusInvestasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterStatusInvestasi" (
    id text NOT NULL,
    name text NOT NULL,
    color text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MasterStatusInvestasi" OWNER TO bip;

--
-- Name: MasterStatusTransaksiInvestasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterStatusTransaksiInvestasi" (
    id text NOT NULL,
    name text NOT NULL,
    color text,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MasterStatusTransaksiInvestasi" OWNER TO bip;

--
-- Name: MasterUserRole; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."MasterUserRole" (
    id text NOT NULL,
    name text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."MasterUserRole" OWNER TO bip;

--
-- Name: NomorAdmin; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."NomorAdmin" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    nomor text NOT NULL
);


ALTER TABLE public."NomorAdmin" OWNER TO bip;

--
-- Name: Notifikasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Notifikasi" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "appId" text NOT NULL,
    "kategoriApp" text NOT NULL,
    pesan text NOT NULL,
    title text,
    status text,
    "userRoleId" text NOT NULL,
    "userId" text,
    "adminId" text
);


ALTER TABLE public."Notifikasi" OWNER TO bip;

--
-- Name: Portofolio; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Portofolio" (
    id text NOT NULL,
    "id_Portofolio" text NOT NULL,
    "namaBisnis" text NOT NULL,
    "alamatKantor" text NOT NULL,
    tlpn text NOT NULL,
    deskripsi text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "profileId" text,
    "masterBidangBisnisId" text NOT NULL,
    "logoId" text
);


ALTER TABLE public."Portofolio" OWNER TO bip;

--
-- Name: Portofolio_MediaSosial; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Portofolio_MediaSosial" (
    id text NOT NULL,
    facebook text,
    twitter text,
    instagram text,
    tiktok text,
    youtube text,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "portofolioId" text
);


ALTER TABLE public."Portofolio_MediaSosial" OWNER TO bip;

--
-- Name: Profile; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Profile" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    alamat text NOT NULL,
    "jenisKelamin" text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text,
    "imageId" text,
    "imageBackgroundId" text
);


ALTER TABLE public."Profile" OWNER TO bip;

--
-- Name: ProjectCollaboration; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaboration" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    lokasi text NOT NULL,
    purpose text NOT NULL,
    benefit text,
    "isReject" boolean DEFAULT false,
    report text,
    "projectCollaborationMaster_IndustriId" integer,
    "userId" text,
    "projectCollaborationMaster_StatusId" integer DEFAULT 1
);


ALTER TABLE public."ProjectCollaboration" OWNER TO bip;

--
-- Name: ProjectCollaborationMaster_Industri; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaborationMaster_Industri" (
    id integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."ProjectCollaborationMaster_Industri" OWNER TO bip;

--
-- Name: ProjectCollaborationMaster_Industri_id_seq; Type: SEQUENCE; Schema: public; Owner: bip
--

CREATE SEQUENCE public."ProjectCollaborationMaster_Industri_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProjectCollaborationMaster_Industri_id_seq" OWNER TO bip;

--
-- Name: ProjectCollaborationMaster_Industri_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bip
--

ALTER SEQUENCE public."ProjectCollaborationMaster_Industri_id_seq" OWNED BY public."ProjectCollaborationMaster_Industri".id;


--
-- Name: ProjectCollaborationMaster_Status; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaborationMaster_Status" (
    id integer NOT NULL,
    name text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProjectCollaborationMaster_Status" OWNER TO bip;

--
-- Name: ProjectCollaborationMaster_Status_id_seq; Type: SEQUENCE; Schema: public; Owner: bip
--

CREATE SEQUENCE public."ProjectCollaborationMaster_Status_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProjectCollaborationMaster_Status_id_seq" OWNER TO bip;

--
-- Name: ProjectCollaborationMaster_Status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bip
--

ALTER SEQUENCE public."ProjectCollaborationMaster_Status_id_seq" OWNED BY public."ProjectCollaborationMaster_Status".id;


--
-- Name: ProjectCollaboration_AnggotaRoomChat; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaboration_AnggotaRoomChat" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "projectCollaboration_RoomChatId" text
);


ALTER TABLE public."ProjectCollaboration_AnggotaRoomChat" OWNER TO bip;

--
-- Name: ProjectCollaboration_Message; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaboration_Message" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    message text NOT NULL,
    "isFile" boolean DEFAULT false,
    "userId" text,
    "projectCollaboration_RoomChatId" text
);


ALTER TABLE public."ProjectCollaboration_Message" OWNER TO bip;

--
-- Name: ProjectCollaboration_Notifikasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaboration_Notifikasi" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    note text,
    "projectCollaborationId" text NOT NULL,
    "adminId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."ProjectCollaboration_Notifikasi" OWNER TO bip;

--
-- Name: ProjectCollaboration_Partisipasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaboration_Partisipasi" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text,
    "projectCollaborationId" text,
    deskripsi_diri text NOT NULL
);


ALTER TABLE public."ProjectCollaboration_Partisipasi" OWNER TO bip;

--
-- Name: ProjectCollaboration_RoomChat; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProjectCollaboration_RoomChat" (
    id text NOT NULL,
    name text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text,
    "projectCollaborationId" text
);


ALTER TABLE public."ProjectCollaboration_RoomChat" OWNER TO bip;

--
-- Name: ProspektusInvestasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."ProspektusInvestasi" (
    id text NOT NULL,
    url text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "investasiId" text,
    "fileId" text,
    title text
);


ALTER TABLE public."ProspektusInvestasi" OWNER TO bip;

--
-- Name: TransaksiInvestasi; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."TransaksiInvestasi" (
    id text NOT NULL,
    "investasiId" text NOT NULL,
    "authorId" text NOT NULL,
    "namaBank" text,
    "nomorRekening" text,
    token text,
    redirect_url text,
    quantity text NOT NULL,
    price text NOT NULL,
    gross_amount text NOT NULL,
    merchant_name text NOT NULL,
    status_code text,
    status_message text,
    transaction_id text,
    order_id text,
    payment_type text,
    transaction_time text,
    transaction_status text,
    fraud_status text,
    pdf_url text,
    finish_redirect_url text,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "masterStatusTransaksiInvestasiId" text DEFAULT '1'::text
);


ALTER TABLE public."TransaksiInvestasi" OWNER TO bip;

--
-- Name: User; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."User" (
    id text NOT NULL,
    active boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "masterUserRoleId" text DEFAULT '1'::text NOT NULL,
    nomor text NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    username text NOT NULL
);


ALTER TABLE public."User" OWNER TO bip;

--
-- Name: UserSession; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."UserSession" (
    id text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."UserSession" OWNER TO bip;

--
-- Name: Voting; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Voting" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isArsip" boolean DEFAULT false NOT NULL,
    title text NOT NULL,
    deskripsi text NOT NULL,
    "awalVote" timestamp(3) without time zone NOT NULL,
    "akhirVote" timestamp(3) without time zone NOT NULL,
    catatan text,
    "authorId" text NOT NULL,
    "voting_StatusId" text DEFAULT '2'::text
);


ALTER TABLE public."Voting" OWNER TO bip;

--
-- Name: Voting_DaftarNamaVote; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Voting_DaftarNamaVote" (
    id text NOT NULL,
    value text NOT NULL,
    jumlah integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "votingId" text
);


ALTER TABLE public."Voting_DaftarNamaVote" OWNER TO bip;

--
-- Name: Voting_Kontributor; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Voting_Kontributor" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "votingId" text,
    "authorId" text,
    "voting_DaftarNamaVoteId" text
);


ALTER TABLE public."Voting_Kontributor" OWNER TO bip;

--
-- Name: Voting_Status; Type: TABLE; Schema: public; Owner: bip
--

CREATE TABLE public."Voting_Status" (
    id text NOT NULL,
    name text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Voting_Status" OWNER TO bip;

--
-- Name: EventMaster_TipeAcara id; Type: DEFAULT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventMaster_TipeAcara" ALTER COLUMN id SET DEFAULT nextval('public."EventMaster_TipeAcara_id_seq"'::regclass);


--
-- Name: ForumMaster_KategoriReport id; Type: DEFAULT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ForumMaster_KategoriReport" ALTER COLUMN id SET DEFAULT nextval('public."ForumMaster_KategoriReport_id_seq"'::regclass);


--
-- Name: ForumMaster_StatusPosting id; Type: DEFAULT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ForumMaster_StatusPosting" ALTER COLUMN id SET DEFAULT nextval('public."ForumMaster_StatusPosting_id_seq"'::regclass);


--
-- Name: ProjectCollaborationMaster_Industri id; Type: DEFAULT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaborationMaster_Industri" ALTER COLUMN id SET DEFAULT nextval('public."ProjectCollaborationMaster_Industri_id_seq"'::regclass);


--
-- Name: ProjectCollaborationMaster_Status id; Type: DEFAULT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaborationMaster_Status" ALTER COLUMN id SET DEFAULT nextval('public."ProjectCollaborationMaster_Status_id_seq"'::regclass);


--
-- Data for Name: BeritaInvestasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."BeritaInvestasi" (id, title, deskripsi, active, "createdAt", "updatedAt", "imagesId", "investasiId", "imageId") FROM stdin;
\.


--
-- Data for Name: BusinessMaps; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."BusinessMaps" (id, "isActive", "createdAt", "updatedAt", "namePin", latitude, longitude, "authorId", "portofolioId", "imageId", "pinId") FROM stdin;
\.


--
-- Data for Name: DokumenInvestasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."DokumenInvestasi" (id, title, url, active, "createdAt", "updatedAt", "investasiId", "fileId") FROM stdin;
\.


--
-- Data for Name: Donasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Donasi" (id, title, target, active, "createdAt", "updatedAt", "publishTime", catatan, progres, terkumpul, "namaBank", rekening, "akumulasiPencairan", "totalPencairan", "authorId", "imagesId", "donasiMaster_KategoriId", "donasiMaster_DurasiId", "donasiMaster_StatusDonasiId", "imageId") FROM stdin;
\.


--
-- Data for Name: DonasiMaster_Bank; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."DonasiMaster_Bank" (id, name, norek, active, "createdAt", "updatedAt") FROM stdin;
1	BRI	9065456754325643	t	2025-01-23 02:59:24.313	2025-01-23 02:59:24.313
2	BCA	2304235678854332	t	2025-01-23 02:59:24.315	2025-01-23 02:59:24.315
3	BNI	1104786754324564	t	2025-01-23 02:59:24.316	2025-01-23 02:59:24.316
4	BSI	7076543567898976	t	2025-01-23 02:59:24.317	2025-01-23 02:59:24.317
\.


--
-- Data for Name: DonasiMaster_Durasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."DonasiMaster_Durasi" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	30	t	2025-01-23 02:59:24.308	2025-01-23 02:59:24.308
2	60	t	2025-01-23 02:59:24.311	2025-01-23 02:59:24.311
3	90	t	2025-01-23 02:59:24.312	2025-01-23 02:59:24.312
4	120	t	2025-01-23 02:59:24.313	2025-01-23 02:59:24.313
\.


--
-- Data for Name: DonasiMaster_Kategori; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."DonasiMaster_Kategori" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Medis	t	2025-01-23 02:59:24.304	2025-01-23 02:59:24.304
2	Kegiatan Sosial	t	2025-01-23 02:59:24.305	2025-01-23 02:59:24.305
3	Pendidikan	t	2025-01-23 02:59:24.306	2025-01-23 02:59:24.306
4	Rumah Ibadah	t	2025-01-23 02:59:24.307	2025-01-23 02:59:24.307
5	Bencana Alam	t	2025-01-23 02:59:24.307	2025-01-23 02:59:24.307
\.


--
-- Data for Name: DonasiMaster_StatusDonasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."DonasiMaster_StatusDonasi" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Publish	t	2025-01-23 02:59:24.3	2025-01-23 02:59:24.3
2	Review	t	2025-01-23 02:59:24.302	2025-01-23 02:59:24.302
3	Draft	t	2025-01-23 02:59:24.302	2025-01-23 02:59:24.302
4	Reject	t	2025-01-23 02:59:24.303	2025-01-23 02:59:24.303
\.


--
-- Data for Name: DonasiMaster_StatusInvoice; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."DonasiMaster_StatusInvoice" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Berhasil	t	2025-01-23 02:59:24.318	2025-01-23 02:59:24.318
2	Proses	t	2025-01-23 02:59:24.319	2025-01-23 02:59:24.319
3	Menunggu	t	2025-01-23 02:59:24.32	2025-01-23 02:59:24.32
4	Gagal	t	2025-01-23 02:59:24.32	2025-01-23 02:59:24.32
\.


--
-- Data for Name: Donasi_Cerita; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Donasi_Cerita" (id, pembukaan, cerita, active, "createdAt", "updatedAt", "imagesId", "donasiId", "imageId") FROM stdin;
\.


--
-- Data for Name: Donasi_Invoice; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Donasi_Invoice" (id, nominal, active, "createdAt", "updatedAt", "donasiId", "donasiMaster_BankId", "donasiMaster_StatusInvoiceId", "authorId", "imagesId", "imageId") FROM stdin;
\.


--
-- Data for Name: Donasi_Kabar; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Donasi_Kabar" (id, title, deskripsi, active, "createdAt", "updatedAt", "donasiId", "imagesId", "imageId") FROM stdin;
\.


--
-- Data for Name: Donasi_Notif; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Donasi_Notif" (id, "isRead", active, "createdAt", "updatedAt", "userId", "donasi_KabarId") FROM stdin;
\.


--
-- Data for Name: Donasi_PencairanDana; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Donasi_PencairanDana" (id, "nominalCair", title, deskripsi, active, "createdAt", "updatedAt", "donasiId", "imagesId", "imageId") FROM stdin;
\.


--
-- Data for Name: Donasi_TemporaryCreate; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Donasi_TemporaryCreate" (id, title, target, active, "createdAt", "updatedAt", "imagesId", "donasiMaster_KategoriId", "donasiMaster_DurasiId", "imageId") FROM stdin;
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Event" (id, title, lokasi, tanggal, deskripsi, active, "createdAt", "updatedAt", catatan, "tanggalSelesai", "isArsip", "authorId", "eventMaster_StatusId", "eventMaster_TipeAcaraId") FROM stdin;
\.


--
-- Data for Name: EventMaster_Status; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."EventMaster_Status" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Publish	t	2025-01-23 02:59:24.321	2025-01-23 02:59:24.321
2	Review	t	2025-01-23 02:59:24.323	2025-01-23 02:59:24.323
3	Draft	t	2025-01-23 02:59:24.325	2025-01-23 02:59:24.325
4	Reject	t	2025-01-23 02:59:24.326	2025-01-23 02:59:24.326
\.


--
-- Data for Name: EventMaster_TipeAcara; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."EventMaster_TipeAcara" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Seminar	t	2025-01-23 02:59:24.327	2025-01-23 02:59:24.327
2	Workshop	t	2025-01-23 02:59:24.332	2025-01-23 02:59:24.332
3	Konferensi	t	2025-01-23 02:59:24.333	2025-01-23 02:59:24.333
4	Musyawarah Anggota	t	2025-01-23 02:59:24.333	2025-01-23 02:59:24.333
5	Kegiatan Sosial	t	2025-01-23 02:59:24.334	2025-01-23 02:59:24.334
\.


--
-- Data for Name: EventSponsor; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."EventSponsor" (id, "isActive", "createdAt", "updatedAt", name, "fileName", "fileExt", "fileId", "auhtorId", "eventId") FROM stdin;
\.


--
-- Data for Name: EventTransaksi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."EventTransaksi" (id, "isActive", "createdAt", "updatedAt", nominal, "masterBankId", status, "transferImageId", "authorId", "eventId", "eventSponsorId") FROM stdin;
\.


--
-- Data for Name: Event_Peserta; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Event_Peserta" (id, active, "createdAt", "updatedAt", "isPresent", "eventId", "userId") FROM stdin;
\.


--
-- Data for Name: ForumMaster_KategoriReport; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ForumMaster_KategoriReport" (id, "isActive", "createdAt", "updatedAt", title, deskripsi) FROM stdin;
1	t	2025-01-23 02:59:24.343	2025-01-23 02:59:24.343	Kebencian	Cercaan, Stereotip rasis atau seksis, Dehumanisasi, Menyulut ketakutan atau diskriminasi, Referensi kebencian, Simbol & logo kebencian
2	t	2025-01-23 02:59:24.352	2025-01-23 02:59:24.352	Penghinaan & Pelecehan secara Online	Penghinaan, Konten Seksual yang Tidak Diinginkan, Penyangkalan Peristiwa Kekerasan, Pelecehan Bertarget dan Memprovokasi Pelecehan
3	t	2025-01-23 02:59:24.353	2025-01-23 02:59:24.353	Tutur Kekerasan	Ancaman Kekerasan, Berharap Terjadinya Celaka, Mengagungkan Kekerasan, Penghasutan Kekerasan, Penghasutan Kekerasan dengan Kode
4	t	2025-01-23 02:59:24.355	2025-01-23 02:59:24.355	Keselamatan Anak	Eksploitasi seks anak di bawah umur, grooming, kekerasan fisik terhadap anak, pengguna di bawah umur
5	t	2025-01-23 02:59:24.356	2025-01-23 02:59:24.356	Privasi	Membagikan informasi pribadi, mengancam akan membagikan/menyebarkan informasi pribadi, membagikan gambar intim tanpa persetujuan, membagikan gambar saya yang tidak saya kehendaki di platform ini
6	t	2025-01-23 02:59:24.357	2025-01-23 02:59:24.357	Spam	Akun palsu, penipuan keuangan, memposting tautan berbahaya, menyalahgunakan hashtag, keterlibatan palsu, balasan berulang, Posting Ulang, atau Direct Message
\.


--
-- Data for Name: ForumMaster_StatusPosting; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ForumMaster_StatusPosting" (id, "isActive", "createdAt", "updatedAt", status) FROM stdin;
1	t	2025-01-23 02:59:24.359	2025-01-23 02:59:24.359	Open
2	t	2025-01-23 02:59:24.362	2025-01-23 02:59:24.362	Closed
\.


--
-- Data for Name: Forum_Komentar; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Forum_Komentar" (id, "isActive", "createdAt", "updatedAt", komentar, "forum_PostingId", "authorId") FROM stdin;
\.


--
-- Data for Name: Forum_Posting; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Forum_Posting" (id, "isActive", "createdAt", "updatedAt", "publishAt", diskusi, "authorId", "forumMaster_StatusPostingId") FROM stdin;
\.


--
-- Data for Name: Forum_ReportKomentar; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Forum_ReportKomentar" (id, "isActive", "createdAt", "updatedAt", deskripsi, "forumMaster_KategoriReportId", "forum_KomentarId", "userId") FROM stdin;
\.


--
-- Data for Name: Forum_ReportPosting; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Forum_ReportPosting" (id, "isActive", "createdAt", "updatedAt", deskripsi, "forumMaster_KategoriReportId", "forum_PostingId", "userId") FROM stdin;
\.


--
-- Data for Name: Images; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Images" (id, url, label, active, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Investasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Investasi" (id, title, "targetDana", "hargaLembar", "totalLembar", roi, active, "countDown", "createdAt", "updatedAt", "authorId", catatan, "sisaLembar", "lembarTerbeli", progress, "masterPeriodeDevidenId", "masterPembagianDevidenId", "masterPencarianInvestorId", "imagesId", "masterStatusInvestasiId", "masterProgresInvestasiId", "imageId", "prospektusFileId") FROM stdin;
\.


--
-- Data for Name: InvestasiMaster_StatusInvoice; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."InvestasiMaster_StatusInvoice" (id, name, "isActive", "createdAt", "updatedAt") FROM stdin;
1	Berhasil	t	2025-01-23 02:59:24.391	2025-01-23 02:59:24.391
2	Proses	t	2025-01-23 02:59:24.394	2025-01-23 02:59:24.394
3	Menunggu	t	2025-01-23 02:59:24.394	2025-01-23 02:59:24.394
4	Gagal	t	2025-01-23 02:59:24.395	2025-01-23 02:59:24.395
\.


--
-- Data for Name: Investasi_Invoice; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Investasi_Invoice" (id, "isActive", "createdAt", "updatedAt", nominal, "lembarTerbeli", "investasiId", "masterBankId", "statusInvoiceId", "authorId", "imagesId", "imageId") FROM stdin;
\.


--
-- Data for Name: Job; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Job" (id, "isActive", "createdAt", "updatedAt", "isArsip", catatan, title, content, deskripsi, "authorId", "masterStatusId", "imageId") FROM stdin;
\.


--
-- Data for Name: KodeOtp; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."KodeOtp" (id, "isActive", "createdAt", "updatedAt", nomor, otp) FROM stdin;
cm68pm6ko0000wphyvrmd8j3l	t	2025-01-23 02:24:18.87	2025-01-23 02:24:18.87	6282340374412	8964
cm68pzrr2000awphyi0sdyp5v	t	2025-01-23 02:34:52.862	2025-01-23 02:34:52.862	628234037441	2520
cm68qcugj000cwphy2bjuw22r	t	2025-01-23 02:45:02.898	2025-01-23 02:45:02.898	628234037441	1673
cm68qh2pj000ewphy4qs5ismv	t	2025-01-23 02:48:20.216	2025-01-23 02:48:20.216	6289647037426	5112
cm68qrjvk0000bmx164jj6y7q	t	2025-01-23 02:56:29.024	2025-01-23 02:56:29.024	6289647037426	3106
\.


--
-- Data for Name: MasterBank; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterBank" (id, "namaBank", "namaAkun", norek, "isActive", "createdAt", "updatedAt") FROM stdin;
1	BRI	Himpunan Pengusaha Muda Indonesia	9065456754325643	t	2025-01-23 02:59:24.286	2025-01-23 02:59:24.286
2	BCA	Himpunan Pengusaha Muda Indonesia	2304235678854332	t	2025-01-23 02:59:24.288	2025-01-23 02:59:24.288
3	BNI	Himpunan Pengusaha Muda Indonesia	1104786754324564	t	2025-01-23 02:59:24.289	2025-01-23 02:59:24.289
4	BSI	Himpunan Pengusaha Muda Indonesia	7076543567898976	t	2025-01-23 02:59:24.29	2025-01-23 02:59:24.29
\.


--
-- Data for Name: MasterBidangBisnis; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterBidangBisnis" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Software Developer	t	2025-01-23 02:59:24.26	2025-01-23 02:59:24.26
2	Makanan & Minuman	t	2025-01-23 02:59:24.264	2025-01-23 02:59:24.264
3	Kosmetik	t	2025-01-23 02:59:24.265	2025-01-23 02:59:24.265
4	Mesin Mobil	t	2025-01-23 02:59:24.266	2025-01-23 02:59:24.266
5	Rental Kendaraan	t	2025-01-23 02:59:24.267	2025-01-23 02:59:24.267
6	Kedokteran	t	2025-01-23 02:59:24.268	2025-01-23 02:59:24.268
\.


--
-- Data for Name: MasterKategoriApp; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterKategoriApp" (id, "isActive", "createdAt", "updatedAt", name, value) FROM stdin;
1	t	2025-01-23 02:59:24.383	2025-01-23 02:59:24.383	Event	\N
2	t	2025-01-23 02:59:24.387	2025-01-23 02:59:24.387	Job	\N
3	t	2025-01-23 02:59:24.387	2025-01-23 02:59:24.387	Voting	\N
4	t	2025-01-23 02:59:24.388	2025-01-23 02:59:24.388	Donasi	\N
5	t	2025-01-23 02:59:24.389	2025-01-23 02:59:24.389	Investasi	\N
6	t	2025-01-23 02:59:24.39	2025-01-23 02:59:24.39	Forum	\N
7	t	2025-01-23 02:59:24.391	2025-01-23 02:59:24.391	Collaboration	\N
\.


--
-- Data for Name: MasterPembagianDeviden; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterPembagianDeviden" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	3	t	2025-01-23 02:59:24.275	2025-01-23 02:59:24.275
2	6	t	2025-01-23 02:59:24.277	2025-01-23 02:59:24.277
3	9	t	2025-01-23 02:59:24.278	2025-01-23 02:59:24.278
4	12	t	2025-01-23 02:59:24.279	2025-01-23 02:59:24.279
\.


--
-- Data for Name: MasterPencarianInvestor; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterPencarianInvestor" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	30	t	2025-01-23 02:59:24.269	2025-01-23 02:59:24.269
2	60	t	2025-01-23 02:59:24.273	2025-01-23 02:59:24.273
3	90	t	2025-01-23 02:59:24.274	2025-01-23 02:59:24.274
4	120	t	2025-01-23 02:59:24.274	2025-01-23 02:59:24.274
\.


--
-- Data for Name: MasterPeriodeDeviden; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterPeriodeDeviden" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Selamanya	t	2025-01-23 02:59:24.279	2025-01-23 02:59:24.279
2	Satu tahun	t	2025-01-23 02:59:24.281	2025-01-23 02:59:24.281
\.


--
-- Data for Name: MasterProgresInvestasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterProgresInvestasi" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	Dalam Proses	t	2025-01-23 02:59:24.296	2025-01-23 02:59:24.296
2	Selesai	t	2025-01-23 02:59:24.298	2025-01-23 02:59:24.298
3	Waktu Habis	t	2025-01-23 02:59:24.299	2025-01-23 02:59:24.299
\.


--
-- Data for Name: MasterStatus; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterStatus" (id, name, "isActive", "createdAt", "updatedAt") FROM stdin;
1	Publish	t	2025-01-23 02:59:24.339	2025-01-23 02:59:24.339
2	Review	t	2025-01-23 02:59:24.341	2025-01-23 02:59:24.341
3	Draft	t	2025-01-23 02:59:24.342	2025-01-23 02:59:24.342
4	Reject	t	2025-01-23 02:59:24.343	2025-01-23 02:59:24.343
\.


--
-- Data for Name: MasterStatusInvestasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterStatusInvestasi" (id, name, color, active, "createdAt", "updatedAt") FROM stdin;
1	Publish	green	t	2025-01-23 02:59:24.282	2025-01-23 02:59:24.282
2	Review	orange	t	2025-01-23 02:59:24.283	2025-01-23 02:59:24.283
3	Draft	yellow	t	2025-01-23 02:59:24.284	2025-01-23 02:59:24.284
4	Reject	red	t	2025-01-23 02:59:24.285	2025-01-23 02:59:24.285
\.


--
-- Data for Name: MasterStatusTransaksiInvestasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterStatusTransaksiInvestasi" (id, name, color, active, "createdAt", "updatedAt") FROM stdin;
1	Menunggu	yellow	t	2025-01-23 02:59:24.291	2025-01-23 02:59:24.291
2	Proses	orange	t	2025-01-23 02:59:24.294	2025-01-23 02:59:24.294
3	Berhasil	green	t	2025-01-23 02:59:24.295	2025-01-23 02:59:24.295
4	Gagal	red	t	2025-01-23 02:59:24.295	2025-01-23 02:59:24.295
\.


--
-- Data for Name: MasterUserRole; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."MasterUserRole" (id, name, active, "createdAt", "updatedAt") FROM stdin;
1	User	t	2025-01-23 02:59:24.231	2025-01-23 02:59:24.231
2	Admin	t	2025-01-23 02:59:24.251	2025-01-23 02:59:24.251
3	Super Admin	t	2025-01-23 02:59:24.254	2025-01-23 02:59:24.254
\.


--
-- Data for Name: NomorAdmin; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."NomorAdmin" (id, "isActive", "createdAt", "updatedAt", nomor) FROM stdin;
Nomor-Admin-1234	t	2025-01-23 02:59:24.382	2025-01-23 02:59:24.382	6289697338821
\.


--
-- Data for Name: Notifikasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Notifikasi" (id, "isActive", "createdAt", "updatedAt", "isRead", "appId", "kategoriApp", pesan, title, status, "userRoleId", "userId", "adminId") FROM stdin;
\.


--
-- Data for Name: Portofolio; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Portofolio" (id, "id_Portofolio", "namaBisnis", "alamatKantor", tlpn, deskripsi, active, "createdAt", "updatedAt", "profileId", "masterBidangBisnisId", "logoId") FROM stdin;
\.


--
-- Data for Name: Portofolio_MediaSosial; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Portofolio_MediaSosial" (id, facebook, twitter, instagram, tiktok, youtube, active, "createdAt", "updatedAt", "portofolioId") FROM stdin;
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Profile" (id, name, email, alamat, "jenisKelamin", active, "createdAt", "updatedAt", "userId", "imageId", "imageBackgroundId") FROM stdin;
\.


--
-- Data for Name: ProjectCollaboration; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaboration" (id, "isActive", "createdAt", "updatedAt", title, lokasi, purpose, benefit, "isReject", report, "projectCollaborationMaster_IndustriId", "userId", "projectCollaborationMaster_StatusId") FROM stdin;
\.


--
-- Data for Name: ProjectCollaborationMaster_Industri; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaborationMaster_Industri" (id, "isActive", "createdAt", "updatedAt", name) FROM stdin;
1	t	2025-01-23 02:59:24.363	2025-01-23 02:59:24.363	Software Developer
2	t	2025-01-23 02:59:24.368	2025-01-23 02:59:24.368	Makanan & Minuman
3	t	2025-01-23 02:59:24.37	2025-01-23 02:59:24.37	Kosmetik
4	t	2025-01-23 02:59:24.371	2025-01-23 02:59:24.371	Furniture
5	t	2025-01-23 02:59:24.373	2025-01-23 02:59:24.373	Kendaraan
6	t	2025-01-23 02:59:24.374	2025-01-23 02:59:24.374	Kesehatan
\.


--
-- Data for Name: ProjectCollaborationMaster_Status; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaborationMaster_Status" (id, name, "isActive", "createdAt", "updatedAt") FROM stdin;
1	Publish	t	2025-01-23 02:59:24.376	2025-01-23 02:59:24.376
2	Review	t	2025-01-23 02:59:24.379	2025-01-23 02:59:24.379
3	Reject	t	2025-01-23 02:59:24.38	2025-01-23 02:59:24.38
\.


--
-- Data for Name: ProjectCollaboration_AnggotaRoomChat; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaboration_AnggotaRoomChat" (id, "isActive", "createdAt", "updatedAt", "userId", "projectCollaboration_RoomChatId") FROM stdin;
\.


--
-- Data for Name: ProjectCollaboration_Message; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaboration_Message" (id, "isActive", "createdAt", "updatedAt", message, "isFile", "userId", "projectCollaboration_RoomChatId") FROM stdin;
\.


--
-- Data for Name: ProjectCollaboration_Notifikasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaboration_Notifikasi" (id, "isActive", "createdAt", "updatedAt", "isRead", note, "projectCollaborationId", "adminId", "userId") FROM stdin;
\.


--
-- Data for Name: ProjectCollaboration_Partisipasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaboration_Partisipasi" (id, "isActive", "createdAt", "updatedAt", "userId", "projectCollaborationId", deskripsi_diri) FROM stdin;
\.


--
-- Data for Name: ProjectCollaboration_RoomChat; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProjectCollaboration_RoomChat" (id, name, "isActive", "createdAt", "updatedAt", "userId", "projectCollaborationId") FROM stdin;
\.


--
-- Data for Name: ProspektusInvestasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."ProspektusInvestasi" (id, url, active, "createdAt", "updatedAt", "investasiId", "fileId", title) FROM stdin;
\.


--
-- Data for Name: TransaksiInvestasi; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."TransaksiInvestasi" (id, "investasiId", "authorId", "namaBank", "nomorRekening", token, redirect_url, quantity, price, gross_amount, merchant_name, status_code, status_message, transaction_id, order_id, payment_type, transaction_time, transaction_status, fraud_status, pdf_url, finish_redirect_url, active, "createdAt", "updatedAt", "masterStatusTransaksiInvestasiId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."User" (id, active, "createdAt", "masterUserRoleId", nomor, "updatedAt", username) FROM stdin;
cm68qvb3300018vfy1n5b0yxd	t	2025-01-23 02:59:24.255	3	6282340374412	2025-01-23 02:59:24.255	bagas_admin
cm68qvb3700038vfy8nucraat	t	2025-01-23 02:59:24.259	2	628123833845	2025-01-23 02:59:24.259	fahmi_admin
cm68qvb3700038vfy8nucraatc	t	2025-01-23 02:59:24.259	2	6281238338454	2025-01-23 02:59:24.259	fahmi_adminx
\.


--
-- Data for Name: UserSession; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."UserSession" (id, token, expires, active, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: Voting; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Voting" (id, "isActive", "createdAt", "updatedAt", "isArsip", title, deskripsi, "awalVote", "akhirVote", catatan, "authorId", "voting_StatusId") FROM stdin;
\.


--
-- Data for Name: Voting_DaftarNamaVote; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Voting_DaftarNamaVote" (id, value, jumlah, "isActive", "createdAt", "updatedAt", "votingId") FROM stdin;
\.


--
-- Data for Name: Voting_Kontributor; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Voting_Kontributor" (id, "isActive", "createdAt", "updatedAt", "votingId", "authorId", "voting_DaftarNamaVoteId") FROM stdin;
\.


--
-- Data for Name: Voting_Status; Type: TABLE DATA; Schema: public; Owner: bip
--

COPY public."Voting_Status" (id, name, "isActive", "createdAt", "updatedAt") FROM stdin;
1	Publish	t	2025-01-23 02:59:24.335	2025-01-23 02:59:24.335
2	Review	t	2025-01-23 02:59:24.338	2025-01-23 02:59:24.338
3	Draft	t	2025-01-23 02:59:24.338	2025-01-23 02:59:24.338
4	Reject	t	2025-01-23 02:59:24.339	2025-01-23 02:59:24.339
\.


--
-- Name: EventMaster_TipeAcara_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bip
--

SELECT pg_catalog.setval('public."EventMaster_TipeAcara_id_seq"', 1, false);


--
-- Name: ForumMaster_KategoriReport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bip
--

SELECT pg_catalog.setval('public."ForumMaster_KategoriReport_id_seq"', 6, true);


--
-- Name: ForumMaster_StatusPosting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bip
--

SELECT pg_catalog.setval('public."ForumMaster_StatusPosting_id_seq"', 2, true);


--
-- Name: ProjectCollaborationMaster_Industri_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bip
--

SELECT pg_catalog.setval('public."ProjectCollaborationMaster_Industri_id_seq"', 6, true);


--
-- Name: ProjectCollaborationMaster_Status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bip
--

SELECT pg_catalog.setval('public."ProjectCollaborationMaster_Status_id_seq"', 3, true);


--
-- Name: BeritaInvestasi BeritaInvestasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."BeritaInvestasi"
    ADD CONSTRAINT "BeritaInvestasi_pkey" PRIMARY KEY (id);


--
-- Name: BusinessMaps BusinessMaps_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."BusinessMaps"
    ADD CONSTRAINT "BusinessMaps_pkey" PRIMARY KEY (id);


--
-- Name: DokumenInvestasi DokumenInvestasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."DokumenInvestasi"
    ADD CONSTRAINT "DokumenInvestasi_pkey" PRIMARY KEY (id);


--
-- Name: DonasiMaster_Bank DonasiMaster_Bank_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."DonasiMaster_Bank"
    ADD CONSTRAINT "DonasiMaster_Bank_pkey" PRIMARY KEY (id);


--
-- Name: DonasiMaster_Durasi DonasiMaster_Durasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."DonasiMaster_Durasi"
    ADD CONSTRAINT "DonasiMaster_Durasi_pkey" PRIMARY KEY (id);


--
-- Name: DonasiMaster_Kategori DonasiMaster_Kategori_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."DonasiMaster_Kategori"
    ADD CONSTRAINT "DonasiMaster_Kategori_pkey" PRIMARY KEY (id);


--
-- Name: DonasiMaster_StatusDonasi DonasiMaster_StatusDonasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."DonasiMaster_StatusDonasi"
    ADD CONSTRAINT "DonasiMaster_StatusDonasi_pkey" PRIMARY KEY (id);


--
-- Name: DonasiMaster_StatusInvoice DonasiMaster_StatusInvoice_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."DonasiMaster_StatusInvoice"
    ADD CONSTRAINT "DonasiMaster_StatusInvoice_pkey" PRIMARY KEY (id);


--
-- Name: Donasi_Cerita Donasi_Cerita_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Cerita"
    ADD CONSTRAINT "Donasi_Cerita_pkey" PRIMARY KEY (id);


--
-- Name: Donasi_Invoice Donasi_Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Invoice"
    ADD CONSTRAINT "Donasi_Invoice_pkey" PRIMARY KEY (id);


--
-- Name: Donasi_Kabar Donasi_Kabar_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Kabar"
    ADD CONSTRAINT "Donasi_Kabar_pkey" PRIMARY KEY (id);


--
-- Name: Donasi_Notif Donasi_Notif_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Notif"
    ADD CONSTRAINT "Donasi_Notif_pkey" PRIMARY KEY (id);


--
-- Name: Donasi_PencairanDana Donasi_PencairanDana_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_PencairanDana"
    ADD CONSTRAINT "Donasi_PencairanDana_pkey" PRIMARY KEY (id);


--
-- Name: Donasi_TemporaryCreate Donasi_TemporaryCreate_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_TemporaryCreate"
    ADD CONSTRAINT "Donasi_TemporaryCreate_pkey" PRIMARY KEY (id);


--
-- Name: Donasi Donasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi"
    ADD CONSTRAINT "Donasi_pkey" PRIMARY KEY (id);


--
-- Name: EventMaster_Status EventMaster_Status_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventMaster_Status"
    ADD CONSTRAINT "EventMaster_Status_pkey" PRIMARY KEY (id);


--
-- Name: EventMaster_TipeAcara EventMaster_TipeAcara_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventMaster_TipeAcara"
    ADD CONSTRAINT "EventMaster_TipeAcara_pkey" PRIMARY KEY (id);


--
-- Name: EventSponsor EventSponsor_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventSponsor"
    ADD CONSTRAINT "EventSponsor_pkey" PRIMARY KEY (id);


--
-- Name: EventTransaksi EventTransaksi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventTransaksi"
    ADD CONSTRAINT "EventTransaksi_pkey" PRIMARY KEY (id);


--
-- Name: Event_Peserta Event_Peserta_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Event_Peserta"
    ADD CONSTRAINT "Event_Peserta_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: ForumMaster_KategoriReport ForumMaster_KategoriReport_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ForumMaster_KategoriReport"
    ADD CONSTRAINT "ForumMaster_KategoriReport_pkey" PRIMARY KEY (id);


--
-- Name: ForumMaster_StatusPosting ForumMaster_StatusPosting_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ForumMaster_StatusPosting"
    ADD CONSTRAINT "ForumMaster_StatusPosting_pkey" PRIMARY KEY (id);


--
-- Name: Forum_Komentar Forum_Komentar_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_Komentar"
    ADD CONSTRAINT "Forum_Komentar_pkey" PRIMARY KEY (id);


--
-- Name: Forum_Posting Forum_Posting_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_Posting"
    ADD CONSTRAINT "Forum_Posting_pkey" PRIMARY KEY (id);


--
-- Name: Forum_ReportKomentar Forum_ReportKomentar_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportKomentar"
    ADD CONSTRAINT "Forum_ReportKomentar_pkey" PRIMARY KEY (id);


--
-- Name: Forum_ReportPosting Forum_ReportPosting_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportPosting"
    ADD CONSTRAINT "Forum_ReportPosting_pkey" PRIMARY KEY (id);


--
-- Name: Images Images_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Images"
    ADD CONSTRAINT "Images_pkey" PRIMARY KEY (id);


--
-- Name: InvestasiMaster_StatusInvoice InvestasiMaster_StatusInvoice_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."InvestasiMaster_StatusInvoice"
    ADD CONSTRAINT "InvestasiMaster_StatusInvoice_pkey" PRIMARY KEY (id);


--
-- Name: Investasi_Invoice Investasi_Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi_Invoice"
    ADD CONSTRAINT "Investasi_Invoice_pkey" PRIMARY KEY (id);


--
-- Name: Investasi Investasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_pkey" PRIMARY KEY (id);


--
-- Name: Job Job_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);


--
-- Name: KodeOtp KodeOtp_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."KodeOtp"
    ADD CONSTRAINT "KodeOtp_pkey" PRIMARY KEY (id);


--
-- Name: MasterBank MasterBank_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterBank"
    ADD CONSTRAINT "MasterBank_pkey" PRIMARY KEY (id);


--
-- Name: MasterBidangBisnis MasterBidangBisnis_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterBidangBisnis"
    ADD CONSTRAINT "MasterBidangBisnis_pkey" PRIMARY KEY (id);


--
-- Name: MasterKategoriApp MasterKategoriApp_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterKategoriApp"
    ADD CONSTRAINT "MasterKategoriApp_pkey" PRIMARY KEY (id);


--
-- Name: MasterPembagianDeviden MasterPembagianDeviden_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterPembagianDeviden"
    ADD CONSTRAINT "MasterPembagianDeviden_pkey" PRIMARY KEY (id);


--
-- Name: MasterPencarianInvestor MasterPencarianInvestor_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterPencarianInvestor"
    ADD CONSTRAINT "MasterPencarianInvestor_pkey" PRIMARY KEY (id);


--
-- Name: MasterPeriodeDeviden MasterPeriodeDeviden_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterPeriodeDeviden"
    ADD CONSTRAINT "MasterPeriodeDeviden_pkey" PRIMARY KEY (id);


--
-- Name: MasterProgresInvestasi MasterProgresInvestasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterProgresInvestasi"
    ADD CONSTRAINT "MasterProgresInvestasi_pkey" PRIMARY KEY (id);


--
-- Name: MasterStatusInvestasi MasterStatusInvestasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterStatusInvestasi"
    ADD CONSTRAINT "MasterStatusInvestasi_pkey" PRIMARY KEY (id);


--
-- Name: MasterStatusTransaksiInvestasi MasterStatusTransaksiInvestasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterStatusTransaksiInvestasi"
    ADD CONSTRAINT "MasterStatusTransaksiInvestasi_pkey" PRIMARY KEY (id);


--
-- Name: MasterStatus MasterStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterStatus"
    ADD CONSTRAINT "MasterStatus_pkey" PRIMARY KEY (id);


--
-- Name: MasterUserRole MasterUserRole_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."MasterUserRole"
    ADD CONSTRAINT "MasterUserRole_pkey" PRIMARY KEY (id);


--
-- Name: NomorAdmin NomorAdmin_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."NomorAdmin"
    ADD CONSTRAINT "NomorAdmin_pkey" PRIMARY KEY (id);


--
-- Name: Notifikasi Notifikasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Notifikasi"
    ADD CONSTRAINT "Notifikasi_pkey" PRIMARY KEY (id);


--
-- Name: Portofolio_MediaSosial Portofolio_MediaSosial_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Portofolio_MediaSosial"
    ADD CONSTRAINT "Portofolio_MediaSosial_pkey" PRIMARY KEY (id);


--
-- Name: Portofolio Portofolio_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Portofolio"
    ADD CONSTRAINT "Portofolio_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaborationMaster_Industri ProjectCollaborationMaster_Industri_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaborationMaster_Industri"
    ADD CONSTRAINT "ProjectCollaborationMaster_Industri_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaborationMaster_Status ProjectCollaborationMaster_Status_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaborationMaster_Status"
    ADD CONSTRAINT "ProjectCollaborationMaster_Status_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaboration_AnggotaRoomChat ProjectCollaboration_AnggotaRoomChat_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_AnggotaRoomChat"
    ADD CONSTRAINT "ProjectCollaboration_AnggotaRoomChat_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaboration_Message ProjectCollaboration_Message_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Message"
    ADD CONSTRAINT "ProjectCollaboration_Message_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaboration_Notifikasi ProjectCollaboration_Notifikasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Notifikasi"
    ADD CONSTRAINT "ProjectCollaboration_Notifikasi_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaboration_Partisipasi ProjectCollaboration_Partisipasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Partisipasi"
    ADD CONSTRAINT "ProjectCollaboration_Partisipasi_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaboration_RoomChat ProjectCollaboration_RoomChat_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_RoomChat"
    ADD CONSTRAINT "ProjectCollaboration_RoomChat_pkey" PRIMARY KEY (id);


--
-- Name: ProjectCollaboration ProjectCollaboration_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration"
    ADD CONSTRAINT "ProjectCollaboration_pkey" PRIMARY KEY (id);


--
-- Name: ProspektusInvestasi ProspektusInvestasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProspektusInvestasi"
    ADD CONSTRAINT "ProspektusInvestasi_pkey" PRIMARY KEY (id);


--
-- Name: TransaksiInvestasi TransaksiInvestasi_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."TransaksiInvestasi"
    ADD CONSTRAINT "TransaksiInvestasi_pkey" PRIMARY KEY (id);


--
-- Name: UserSession UserSession_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."UserSession"
    ADD CONSTRAINT "UserSession_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Voting_DaftarNamaVote Voting_DaftarNamaVote_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting_DaftarNamaVote"
    ADD CONSTRAINT "Voting_DaftarNamaVote_pkey" PRIMARY KEY (id);


--
-- Name: Voting_Kontributor Voting_Kontributor_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting_Kontributor"
    ADD CONSTRAINT "Voting_Kontributor_pkey" PRIMARY KEY (id);


--
-- Name: Voting_Status Voting_Status_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting_Status"
    ADD CONSTRAINT "Voting_Status_pkey" PRIMARY KEY (id);


--
-- Name: Voting Voting_pkey; Type: CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting"
    ADD CONSTRAINT "Voting_pkey" PRIMARY KEY (id);


--
-- Name: BusinessMaps_portofolioId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "BusinessMaps_portofolioId_key" ON public."BusinessMaps" USING btree ("portofolioId");


--
-- Name: Donasi_Cerita_donasiId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Donasi_Cerita_donasiId_key" ON public."Donasi_Cerita" USING btree ("donasiId");


--
-- Name: Donasi_Cerita_imagesId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Donasi_Cerita_imagesId_key" ON public."Donasi_Cerita" USING btree ("imagesId");


--
-- Name: Donasi_TemporaryCreate_imagesId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Donasi_TemporaryCreate_imagesId_key" ON public."Donasi_TemporaryCreate" USING btree ("imagesId");


--
-- Name: Donasi_imagesId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Donasi_imagesId_key" ON public."Donasi" USING btree ("imagesId");


--
-- Name: EventTransaksi_eventSponsorId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "EventTransaksi_eventSponsorId_key" ON public."EventTransaksi" USING btree ("eventSponsorId");


--
-- Name: Investasi_imagesId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Investasi_imagesId_key" ON public."Investasi" USING btree ("imagesId");


--
-- Name: Portofolio_MediaSosial_portofolioId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Portofolio_MediaSosial_portofolioId_key" ON public."Portofolio_MediaSosial" USING btree ("portofolioId");


--
-- Name: Portofolio_id_Portofolio_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Portofolio_id_Portofolio_key" ON public."Portofolio" USING btree ("id_Portofolio");


--
-- Name: Profile_email_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Profile_email_key" ON public."Profile" USING btree (email);


--
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: ProspektusInvestasi_investasiId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "ProspektusInvestasi_investasiId_key" ON public."ProspektusInvestasi" USING btree ("investasiId");


--
-- Name: UserSession_userId_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "UserSession_userId_key" ON public."UserSession" USING btree ("userId");


--
-- Name: User_nomor_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "User_nomor_key" ON public."User" USING btree (nomor);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: bip
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: ProjectCollaboration_Notifikasi AdminNotifProjectUser; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Notifikasi"
    ADD CONSTRAINT "AdminNotifProjectUser" FOREIGN KEY ("adminId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BeritaInvestasi BeritaInvestasi_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."BeritaInvestasi"
    ADD CONSTRAINT "BeritaInvestasi_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: BeritaInvestasi BeritaInvestasi_investasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."BeritaInvestasi"
    ADD CONSTRAINT "BeritaInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES public."Investasi"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BusinessMaps BusinessMaps_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."BusinessMaps"
    ADD CONSTRAINT "BusinessMaps_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: BusinessMaps BusinessMaps_portofolioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."BusinessMaps"
    ADD CONSTRAINT "BusinessMaps_portofolioId_fkey" FOREIGN KEY ("portofolioId") REFERENCES public."Portofolio"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DokumenInvestasi DokumenInvestasi_investasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."DokumenInvestasi"
    ADD CONSTRAINT "DokumenInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES public."Investasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Cerita Donasi_Cerita_donasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Cerita"
    ADD CONSTRAINT "Donasi_Cerita_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES public."Donasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Cerita Donasi_Cerita_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Cerita"
    ADD CONSTRAINT "Donasi_Cerita_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Invoice Donasi_Invoice_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Invoice"
    ADD CONSTRAINT "Donasi_Invoice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Invoice Donasi_Invoice_donasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Invoice"
    ADD CONSTRAINT "Donasi_Invoice_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES public."Donasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Invoice Donasi_Invoice_donasiMaster_BankId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Invoice"
    ADD CONSTRAINT "Donasi_Invoice_donasiMaster_BankId_fkey" FOREIGN KEY ("donasiMaster_BankId") REFERENCES public."DonasiMaster_Bank"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Invoice Donasi_Invoice_donasiMaster_StatusInvoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Invoice"
    ADD CONSTRAINT "Donasi_Invoice_donasiMaster_StatusInvoiceId_fkey" FOREIGN KEY ("donasiMaster_StatusInvoiceId") REFERENCES public."DonasiMaster_StatusInvoice"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Invoice Donasi_Invoice_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Invoice"
    ADD CONSTRAINT "Donasi_Invoice_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Kabar Donasi_Kabar_donasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Kabar"
    ADD CONSTRAINT "Donasi_Kabar_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES public."Donasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Kabar Donasi_Kabar_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Kabar"
    ADD CONSTRAINT "Donasi_Kabar_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Notif Donasi_Notif_donasi_KabarId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Notif"
    ADD CONSTRAINT "Donasi_Notif_donasi_KabarId_fkey" FOREIGN KEY ("donasi_KabarId") REFERENCES public."Donasi_Kabar"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_Notif Donasi_Notif_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_Notif"
    ADD CONSTRAINT "Donasi_Notif_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_PencairanDana Donasi_PencairanDana_donasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_PencairanDana"
    ADD CONSTRAINT "Donasi_PencairanDana_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES public."Donasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_PencairanDana Donasi_PencairanDana_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_PencairanDana"
    ADD CONSTRAINT "Donasi_PencairanDana_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_TemporaryCreate Donasi_TemporaryCreate_donasiMaster_DurasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_TemporaryCreate"
    ADD CONSTRAINT "Donasi_TemporaryCreate_donasiMaster_DurasiId_fkey" FOREIGN KEY ("donasiMaster_DurasiId") REFERENCES public."DonasiMaster_Durasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_TemporaryCreate Donasi_TemporaryCreate_donasiMaster_KategoriId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_TemporaryCreate"
    ADD CONSTRAINT "Donasi_TemporaryCreate_donasiMaster_KategoriId_fkey" FOREIGN KEY ("donasiMaster_KategoriId") REFERENCES public."DonasiMaster_Kategori"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi_TemporaryCreate Donasi_TemporaryCreate_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi_TemporaryCreate"
    ADD CONSTRAINT "Donasi_TemporaryCreate_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi Donasi_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi"
    ADD CONSTRAINT "Donasi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi Donasi_donasiMaster_DurasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi"
    ADD CONSTRAINT "Donasi_donasiMaster_DurasiId_fkey" FOREIGN KEY ("donasiMaster_DurasiId") REFERENCES public."DonasiMaster_Durasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi Donasi_donasiMaster_KategoriId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi"
    ADD CONSTRAINT "Donasi_donasiMaster_KategoriId_fkey" FOREIGN KEY ("donasiMaster_KategoriId") REFERENCES public."DonasiMaster_Kategori"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi Donasi_donasiMaster_StatusDonasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi"
    ADD CONSTRAINT "Donasi_donasiMaster_StatusDonasiId_fkey" FOREIGN KEY ("donasiMaster_StatusDonasiId") REFERENCES public."DonasiMaster_StatusDonasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Donasi Donasi_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Donasi"
    ADD CONSTRAINT "Donasi_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventSponsor EventSponsor_auhtorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventSponsor"
    ADD CONSTRAINT "EventSponsor_auhtorId_fkey" FOREIGN KEY ("auhtorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventSponsor EventSponsor_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventSponsor"
    ADD CONSTRAINT "EventSponsor_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventTransaksi EventTransaksi_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventTransaksi"
    ADD CONSTRAINT "EventTransaksi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventTransaksi EventTransaksi_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventTransaksi"
    ADD CONSTRAINT "EventTransaksi_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventTransaksi EventTransaksi_eventSponsorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventTransaksi"
    ADD CONSTRAINT "EventTransaksi_eventSponsorId_fkey" FOREIGN KEY ("eventSponsorId") REFERENCES public."EventSponsor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventTransaksi EventTransaksi_masterBankId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."EventTransaksi"
    ADD CONSTRAINT "EventTransaksi_masterBankId_fkey" FOREIGN KEY ("masterBankId") REFERENCES public."MasterBank"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Event_Peserta Event_Peserta_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Event_Peserta"
    ADD CONSTRAINT "Event_Peserta_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Event_Peserta Event_Peserta_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Event_Peserta"
    ADD CONSTRAINT "Event_Peserta_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Event Event_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Event Event_eventMaster_StatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_eventMaster_StatusId_fkey" FOREIGN KEY ("eventMaster_StatusId") REFERENCES public."EventMaster_Status"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Event Event_eventMaster_TipeAcaraId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_eventMaster_TipeAcaraId_fkey" FOREIGN KEY ("eventMaster_TipeAcaraId") REFERENCES public."EventMaster_TipeAcara"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_Komentar Forum_Komentar_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_Komentar"
    ADD CONSTRAINT "Forum_Komentar_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_Komentar Forum_Komentar_forum_PostingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_Komentar"
    ADD CONSTRAINT "Forum_Komentar_forum_PostingId_fkey" FOREIGN KEY ("forum_PostingId") REFERENCES public."Forum_Posting"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_Posting Forum_Posting_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_Posting"
    ADD CONSTRAINT "Forum_Posting_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_Posting Forum_Posting_forumMaster_StatusPostingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_Posting"
    ADD CONSTRAINT "Forum_Posting_forumMaster_StatusPostingId_fkey" FOREIGN KEY ("forumMaster_StatusPostingId") REFERENCES public."ForumMaster_StatusPosting"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_ReportKomentar Forum_ReportKomentar_forumMaster_KategoriReportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportKomentar"
    ADD CONSTRAINT "Forum_ReportKomentar_forumMaster_KategoriReportId_fkey" FOREIGN KEY ("forumMaster_KategoriReportId") REFERENCES public."ForumMaster_KategoriReport"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_ReportKomentar Forum_ReportKomentar_forum_KomentarId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportKomentar"
    ADD CONSTRAINT "Forum_ReportKomentar_forum_KomentarId_fkey" FOREIGN KEY ("forum_KomentarId") REFERENCES public."Forum_Komentar"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_ReportKomentar Forum_ReportKomentar_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportKomentar"
    ADD CONSTRAINT "Forum_ReportKomentar_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_ReportPosting Forum_ReportPosting_forumMaster_KategoriReportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportPosting"
    ADD CONSTRAINT "Forum_ReportPosting_forumMaster_KategoriReportId_fkey" FOREIGN KEY ("forumMaster_KategoriReportId") REFERENCES public."ForumMaster_KategoriReport"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_ReportPosting Forum_ReportPosting_forum_PostingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportPosting"
    ADD CONSTRAINT "Forum_ReportPosting_forum_PostingId_fkey" FOREIGN KEY ("forum_PostingId") REFERENCES public."Forum_Posting"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Forum_ReportPosting Forum_ReportPosting_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Forum_ReportPosting"
    ADD CONSTRAINT "Forum_ReportPosting_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi_Invoice Investasi_Invoice_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi_Invoice"
    ADD CONSTRAINT "Investasi_Invoice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi_Invoice Investasi_Invoice_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi_Invoice"
    ADD CONSTRAINT "Investasi_Invoice_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi_Invoice Investasi_Invoice_investasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi_Invoice"
    ADD CONSTRAINT "Investasi_Invoice_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES public."Investasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi_Invoice Investasi_Invoice_masterBankId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi_Invoice"
    ADD CONSTRAINT "Investasi_Invoice_masterBankId_fkey" FOREIGN KEY ("masterBankId") REFERENCES public."MasterBank"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi_Invoice Investasi_Invoice_statusInvoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi_Invoice"
    ADD CONSTRAINT "Investasi_Invoice_statusInvoiceId_fkey" FOREIGN KEY ("statusInvoiceId") REFERENCES public."InvestasiMaster_StatusInvoice"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi Investasi_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi Investasi_imagesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES public."Images"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi Investasi_masterPembagianDevidenId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_masterPembagianDevidenId_fkey" FOREIGN KEY ("masterPembagianDevidenId") REFERENCES public."MasterPembagianDeviden"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi Investasi_masterPencarianInvestorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_masterPencarianInvestorId_fkey" FOREIGN KEY ("masterPencarianInvestorId") REFERENCES public."MasterPencarianInvestor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi Investasi_masterPeriodeDevidenId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_masterPeriodeDevidenId_fkey" FOREIGN KEY ("masterPeriodeDevidenId") REFERENCES public."MasterPeriodeDeviden"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi Investasi_masterProgresInvestasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_masterProgresInvestasiId_fkey" FOREIGN KEY ("masterProgresInvestasiId") REFERENCES public."MasterProgresInvestasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Investasi Investasi_masterStatusInvestasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Investasi"
    ADD CONSTRAINT "Investasi_masterStatusInvestasiId_fkey" FOREIGN KEY ("masterStatusInvestasiId") REFERENCES public."MasterStatusInvestasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Job Job_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Job Job_masterStatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_masterStatusId_fkey" FOREIGN KEY ("masterStatusId") REFERENCES public."MasterStatus"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notifikasi NotifikasiAdmin; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Notifikasi"
    ADD CONSTRAINT "NotifikasiAdmin" FOREIGN KEY ("adminId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notifikasi NotifikasiUser; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Notifikasi"
    ADD CONSTRAINT "NotifikasiUser" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notifikasi Notifikasi_userRoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Notifikasi"
    ADD CONSTRAINT "Notifikasi_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES public."MasterUserRole"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Portofolio_MediaSosial Portofolio_MediaSosial_portofolioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Portofolio_MediaSosial"
    ADD CONSTRAINT "Portofolio_MediaSosial_portofolioId_fkey" FOREIGN KEY ("portofolioId") REFERENCES public."Portofolio"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Portofolio Portofolio_masterBidangBisnisId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Portofolio"
    ADD CONSTRAINT "Portofolio_masterBidangBisnisId_fkey" FOREIGN KEY ("masterBidangBisnisId") REFERENCES public."MasterBidangBisnis"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Portofolio Portofolio_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Portofolio"
    ADD CONSTRAINT "Portofolio_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_AnggotaRoomChat ProjectCollaboration_AnggotaRoomChat_projectCollaboration__fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_AnggotaRoomChat"
    ADD CONSTRAINT "ProjectCollaboration_AnggotaRoomChat_projectCollaboration__fkey" FOREIGN KEY ("projectCollaboration_RoomChatId") REFERENCES public."ProjectCollaboration_RoomChat"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_AnggotaRoomChat ProjectCollaboration_AnggotaRoomChat_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_AnggotaRoomChat"
    ADD CONSTRAINT "ProjectCollaboration_AnggotaRoomChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProjectCollaboration_Message ProjectCollaboration_Message_projectCollaboration_RoomChat_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Message"
    ADD CONSTRAINT "ProjectCollaboration_Message_projectCollaboration_RoomChat_fkey" FOREIGN KEY ("projectCollaboration_RoomChatId") REFERENCES public."ProjectCollaboration_RoomChat"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_Message ProjectCollaboration_Message_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Message"
    ADD CONSTRAINT "ProjectCollaboration_Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_Notifikasi ProjectCollaboration_Notifikasi_projectCollaborationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Notifikasi"
    ADD CONSTRAINT "ProjectCollaboration_Notifikasi_projectCollaborationId_fkey" FOREIGN KEY ("projectCollaborationId") REFERENCES public."ProjectCollaboration"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProjectCollaboration_Partisipasi ProjectCollaboration_Partisipasi_projectCollaborationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Partisipasi"
    ADD CONSTRAINT "ProjectCollaboration_Partisipasi_projectCollaborationId_fkey" FOREIGN KEY ("projectCollaborationId") REFERENCES public."ProjectCollaboration"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_Partisipasi ProjectCollaboration_Partisipasi_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Partisipasi"
    ADD CONSTRAINT "ProjectCollaboration_Partisipasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_RoomChat ProjectCollaboration_RoomChat_projectCollaborationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_RoomChat"
    ADD CONSTRAINT "ProjectCollaboration_RoomChat_projectCollaborationId_fkey" FOREIGN KEY ("projectCollaborationId") REFERENCES public."ProjectCollaboration"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_RoomChat ProjectCollaboration_RoomChat_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_RoomChat"
    ADD CONSTRAINT "ProjectCollaboration_RoomChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration ProjectCollaboration_projectCollaborationMaster_IndustriId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration"
    ADD CONSTRAINT "ProjectCollaboration_projectCollaborationMaster_IndustriId_fkey" FOREIGN KEY ("projectCollaborationMaster_IndustriId") REFERENCES public."ProjectCollaborationMaster_Industri"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration ProjectCollaboration_projectCollaborationMaster_StatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration"
    ADD CONSTRAINT "ProjectCollaboration_projectCollaborationMaster_StatusId_fkey" FOREIGN KEY ("projectCollaborationMaster_StatusId") REFERENCES public."ProjectCollaborationMaster_Status"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration ProjectCollaboration_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration"
    ADD CONSTRAINT "ProjectCollaboration_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProspektusInvestasi ProspektusInvestasi_investasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProspektusInvestasi"
    ADD CONSTRAINT "ProspektusInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES public."Investasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TransaksiInvestasi TransaksiInvestasi_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."TransaksiInvestasi"
    ADD CONSTRAINT "TransaksiInvestasi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TransaksiInvestasi TransaksiInvestasi_investasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."TransaksiInvestasi"
    ADD CONSTRAINT "TransaksiInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES public."Investasi"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TransaksiInvestasi TransaksiInvestasi_masterStatusTransaksiInvestasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."TransaksiInvestasi"
    ADD CONSTRAINT "TransaksiInvestasi_masterStatusTransaksiInvestasiId_fkey" FOREIGN KEY ("masterStatusTransaksiInvestasiId") REFERENCES public."MasterStatusTransaksiInvestasi"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectCollaboration_Notifikasi UserNotifProjectUser; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."ProjectCollaboration_Notifikasi"
    ADD CONSTRAINT "UserNotifProjectUser" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserSession UserSession_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."UserSession"
    ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_masterUserRoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_masterUserRoleId_fkey" FOREIGN KEY ("masterUserRoleId") REFERENCES public."MasterUserRole"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Voting_DaftarNamaVote Voting_DaftarNamaVote_votingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting_DaftarNamaVote"
    ADD CONSTRAINT "Voting_DaftarNamaVote_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES public."Voting"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Voting_Kontributor Voting_Kontributor_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting_Kontributor"
    ADD CONSTRAINT "Voting_Kontributor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Voting_Kontributor Voting_Kontributor_votingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting_Kontributor"
    ADD CONSTRAINT "Voting_Kontributor_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES public."Voting"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Voting_Kontributor Voting_Kontributor_voting_DaftarNamaVoteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting_Kontributor"
    ADD CONSTRAINT "Voting_Kontributor_voting_DaftarNamaVoteId_fkey" FOREIGN KEY ("voting_DaftarNamaVoteId") REFERENCES public."Voting_DaftarNamaVote"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Voting Voting_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting"
    ADD CONSTRAINT "Voting_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Voting Voting_voting_StatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bip
--

ALTER TABLE ONLY public."Voting"
    ADD CONSTRAINT "Voting_voting_StatusId_fkey" FOREIGN KEY ("voting_StatusId") REFERENCES public."Voting_Status"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

