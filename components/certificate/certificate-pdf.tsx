import {
  Circle,
  Document,
  Link,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer"

const EMERALD = "#34d399"
const EMERALD_TINT = "#064e3b"
const EMERALD_BORDER = "#065f46"

const INK = "#fafafa"
const MUTED = "#a1a1aa"
const BORDER = "#27272a"
const CANVAS = "#0a0a0a"
const CARD = "#111113"

const styles = StyleSheet.create({
  page: {
    backgroundColor: CANVAS,
    padding: 24, // was 32
    fontFamily: "Helvetica",
  },

  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 24,
    padding: 10, // was 12
    backgroundColor: CARD,
  },

  canvas: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    position: "relative",
    padding: 32, // was 40
  },

  frameSolid: {
    position: "absolute",
    top: 22, // was 28
    left: 22,
    right: 22,
    bottom: 22,
    borderWidth: 1,
    borderColor: BORDER,
  },
  frameDashed: {
    position: "absolute",
    top: 32, // was 40
    left: 32,
    right: 32,
    bottom: 32,
    borderWidth: 1,
    borderColor: "#3f3f46",
    borderStyle: "dashed",
  },

  cornerTL: {
    position: "absolute",
    top: 18, // was 24
    left: 18,
    width: 14,
    height: 14,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: MUTED,
  },
  cornerTR: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 14,
    height: 14,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: MUTED,
  },
  cornerBL: {
    position: "absolute",
    bottom: 18,
    left: 18,
    width: 14,
    height: 14,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: MUTED,
  },
  cornerBR: {
    position: "absolute",
    bottom: 18,
    right: 18,
    width: 14,
    height: 14,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: MUTED,
  },
  cornerDot: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: MUTED,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32, // was 40
  },

  sealOuter: {
    width: 64, // was 72
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: EMERALD,
    backgroundColor: "#022c22",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14, // was 20
  },
  sealInner: {
    width: 46, // was 52
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: EMERALD_BORDER,
    backgroundColor: CANVAS,
    alignItems: "center",
    justifyContent: "center",
  },
  sealGlyph: {
    fontSize: 22, // was 24
    color: EMERALD,
    fontFamily: "Helvetica-Bold",
  },

  brand: {
    fontSize: 9,
    letterSpacing: 6,
    color: MUTED,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },

  title: {
    fontSize: 30, // was 34
    fontFamily: "Times-Roman",
    color: INK,
    marginTop: 10, // was 16
    letterSpacing: -0.5,
  },

  presented: {
    fontSize: 9,
    letterSpacing: 4,
    color: MUTED,
    textTransform: "uppercase",
    marginTop: 18, // was 28
    fontFamily: "Helvetica",
  },

  name: {
    fontSize: 34, // was 38
    fontFamily: "Times-Italic",
    color: INK,
    marginTop: 8, // was 10
    letterSpacing: -0.5,
  },
  nameUnderline: {
    width: 260, // was 280
    height: 1,
    backgroundColor: BORDER,
    marginTop: 8, // was 10
  },

  body: {
    fontSize: 11,
    color: MUTED,
    marginTop: 14, // was 22
    fontFamily: "Helvetica",
  },
  course: {
    fontSize: 18, // was 20
    color: INK,
    marginTop: 4, // was 6
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.3,
  },

  verifiedPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: EMERALD_BORDER,
    backgroundColor: EMERALD_TINT,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginTop: 16, // was 24
  },
  verifiedDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: EMERALD,
  },
  verifiedText: {
    fontSize: 8,
    letterSpacing: 2,
    color: EMERALD,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  metaValueLink: {
    fontSize: 10,
    color: INK,
    marginTop: 4,
    fontFamily: "Helvetica",
    textDecoration: "underline",
  },

  footerMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22, // was 28
    marginTop: 26, // was 40
  },
  metaCol: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 8,
    letterSpacing: 2,
    color: MUTED,
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  },
  metaValue: {
    fontSize: 10,
    color: INK,
    marginTop: 4,
    fontFamily: "Helvetica",
  },
  metaValueMono: {
    fontSize: 10,
    color: EMERALD,
    marginTop: 4,
    fontFamily: "Courier",
  },
  divider: {
    width: 1,
    height: 24, // was 26
    backgroundColor: BORDER,
  },

  signature: {
    position: "absolute",
    right: 44, // was 64
    bottom: 44, // was 64
    alignItems: "flex-end",
  },
  signatureName: {
    fontSize: 15, // was 16
    fontFamily: "Times-Italic",
    color: MUTED,
  },
  signatureRule: {
    width: 90, // was 100
    height: 1,
    backgroundColor: BORDER,
    marginTop: 4,
  },
  signatureLabel: {
    fontSize: 7,
    letterSpacing: 2,
    color: MUTED,
    textTransform: "uppercase",
    marginTop: 4,
    fontFamily: "Helvetica",
  },
})

type CertificatePDFProps = {
  studentName: string
  courseTitle: string
  serial: string
  issuedAt: Date
}

export function CertificatePDF({
  studentName,
  courseTitle,
  serial,
  issuedAt,
}: CertificatePDFProps) {
  const date = issuedAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <Document
      title={`Parallane Certificate - ${courseTitle}`}
      author="Parallane"
      subject="Certificate of Completion"
      creator="Parallane"
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.card}>
          <View style={styles.canvas}>
            {/* Double frame */}
            <View style={styles.frameSolid} />
            <View style={styles.frameDashed} />

            {/* Corner ornaments */}
            <View style={styles.cornerTL}>
              <View style={[styles.cornerDot, { top: 3, left: 3 }]} />
            </View>
            <View style={styles.cornerTR}>
              <View style={[styles.cornerDot, { top: 3, right: 3 }]} />
            </View>
            <View style={styles.cornerBL}>
              <View style={[styles.cornerDot, { bottom: 3, left: 3 }]} />
            </View>
            <View style={styles.cornerBR}>
              <View style={[styles.cornerDot, { bottom: 3, right: 3 }]} />
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* Foil seal */}
              <View style={styles.sealOuter}>
                <View style={styles.sealInner}>
                  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                    {/* Medal circle */}
                    <Circle
                      cx={12}
                      cy={8}
                      r={6}
                      stroke={EMERALD}
                      strokeWidth={1.75}
                    />

                    {/* Ribbon tails */}
                    <Path
                      d="m15.477 12.89 1.523 9.11-5-3-5 3 1.523-9.11"
                      stroke={EMERALD}
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </Svg>
                </View>
              </View>

              {/* Brand */}
              <Text style={styles.brand}>Parallane</Text>

              {/* Title */}
              <Text style={styles.title}>Certificate of Completion</Text>

              {/* Presented to */}
              <Text style={styles.presented}>Proudly presented to</Text>

              {/* Name */}
              <Text style={styles.name}>{studentName}</Text>
              <View style={styles.nameUnderline} />

              {/* Body */}
              <Text style={styles.body}>for successfully completing</Text>
              <Text style={styles.course}>{courseTitle}</Text>

              {/* Verified pill */}
              <View style={styles.verifiedPill}>
                <View style={styles.verifiedDot} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>

              {/* Footer meta */}
              <View style={styles.footerMeta}>
                <View style={styles.metaCol}>
                  <Text style={styles.metaLabel}>Issued By</Text>
                  <Link
                    src="https://parallane.com"
                    style={styles.metaValueLink}
                  >
                    Parallane.com
                  </Link>
                </View>

                <View style={styles.divider} />

                <View style={styles.metaCol}>
                  <Text style={styles.metaLabel}>Certificate ID</Text>
                  <Text style={styles.metaValueMono}>{serial}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.metaCol}>
                  <Text style={styles.metaLabel}>Completed</Text>
                  <Text style={styles.metaValue}>{date}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
